const express = require("express");
const app = express();

require('custom-env').env(true)
const PORT = parseInt(process.env.PORT);

const { Firestore } = require('@google-cloud/firestore');
let settings = {};
settings.projectId = process.env.GCLOUD_PROJECT;
if (process.env.NODE_ENV === "development") {
    settings.keyFilename = process.env.GCLOUD_KEY_PATH
} else if (process.env.NODE_ENV === "production") {
    settings.credentials = {
        client_email: process.env.GCLOUD_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GCLOUD_SERVICE_ACCOUNT_KEY
    }
} else {
    console.error("Must set NODE_ENV to production or development");
}
const firestore = new Firestore(settings = settings);

app.use(express.static('public'));
app.use(express.json());

// get ingredients in a user's account
app.get('/api/get-ingredients', (req, res) => {
    firestore.collection("users")
        .where("username", "==", req.query.username).get().then(querySnap => {
            if (querySnap.empty) {
                res.json({ ingredients: [] });
            } else {
                let ingredients = querySnap.docs[0].get("ingredients");
                res.json({ ingredients: ingredients });
            }
        }).catch((error) => {
            console.error(error);
        });
});

// get all recipes that contain given ingredient
app.get("/api/get-recipes", (req, res) => {
    firestore.collection("recipes")
        .where("ingredients", "array-contains", req.query.ingr).get().then(querySnap => {
            var recipes = {};
            querySnap.forEach(docSnap => {
                recipes[docSnap.id] = docSnap.data();
            })
            res.json(recipes);
        }).catch((error) => {
            console.error(error);
        });
});

// add any number of ingredients to user's account
app.post("/api/add-ingredients", (req, res) => {
    if (req.body.ingredients.length === 0) {
        res.status(200).send("OK");
        return;
    }
    firestore.collection("users")
        .where("username", "==", req.body.username).get().then(querySnap => {
            if (querySnap.empty) {
                firestore.collection("users").add({
                    username: req.body.username,
                    ingredients: req.body.ingredients
                });
            } else {
                querySnap.docs[0].ref.update(
                    { ingredients: Firestore.FieldValue.arrayUnion(...req.body.ingredients) }
                )
            }
            res.status(200).send("OK");
        }).catch((error) => {
            console.error(error);
        });
});

// delete a single ingredient from user's account
app.post("/api/del-ingredient", (req, res) => {
    firestore.collection("users")
        .where("username", "==", req.body.username).get().then(querySnap => {
            if (!querySnap.empty) {
                querySnap.docs[0].ref.update(
                    { ingredients: Firestore.FieldValue.arrayRemove(req.body.ingr) }
                )
            }
            res.status(200).send("OK");
        }).catch((error) => {
            console.error(error);
        });
});

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});