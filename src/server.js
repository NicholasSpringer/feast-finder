const express = require("express");
const app = express();
const PORT = 9000;

var cors = require("cors");
app.use(cors());

const GCLOUD_PROJECT_ID = "feast-finder";
const KEY_FILE_PATH = "./key.json";

const { Firestore } = require('@google-cloud/firestore');
let settings = { projectId: GCLOUD_PROJECT_ID, keyFilename: KEY_FILE_PATH };
const firestore = new Firestore(settings = settings);

app.use(express.json())

// get ingredients in a user's account
app.get('/get-ingredients', (req, res) => {
    firestore.collection("users")
        .where("username", "==", req.query.username).get().then(querySnap => {
            if (querySnap.empty) {
                res.json({ ingredients: [] });
            } else {
                let ingredients = querySnap.docs[0].get("ingredients");
                res.json({ ingredients: ingredients });
            }
        });
})

// get all recipes that contain given ingredient
app.get("/get-recipes", (req, res) => {
    firestore.collection("recipes")
        .where("ingredients", "array-contains", req.query.ingr).get().then(querySnap => {
            var recipes = {};
            querySnap.forEach(docSnap => {
                recipes[docSnap.id] = docSnap.data();
            })
            res.json(recipes);
        });
})

// add any number of ingredients to user's account
app.post("/add-ingredients", (req, res) => {
    if (req.body.ingredients.length == 0) {
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
        });
})

// delete a single ingredient from user's account
app.post("/del-ingredient", (req, res) => {
    firestore.collection("users")
        .where("username", "==", req.body.username).get().then(querySnap => {
            if (!querySnap.empty) {
                querySnap.docs[0].ref.update(
                    { ingredients: Firestore.FieldValue.arrayRemove(req.body.ingr) }
                )
            }
            res.status(200).send("OK");
        });
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})