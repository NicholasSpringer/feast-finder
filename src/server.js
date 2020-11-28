const express = require("express");
const app = express();
const PORT = 9000;

var cors = require("cors");
app.use(cors());

const GCLOUD_PROJECT_ID = "feast-finder";
const KEY_FILE_PATH = "./key.json";

const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore(settings = {
    projectId: GCLOUD_PROJECT_ID,
    keyFilename: KEY_FILE_PATH
});
app.param('username', function (req, res, next, id) {
    console.log("hello");
    next()
});

app.get('/get-ingredients', (req, res) => {
    firestore.collection("users")
        .where("username", "==", req.query.username).get().then(querySnap => {
            console.log(querySnap.docs);
            if (querySnap.empty) {
                res.json({ ingredients: [] });
            } else {
                let ingredients = querySnap.docs[0].get("ingredients");
                res.json({ ingredients: ingredients });
            }
        });
})

app.get("/get-recipes", (req, res) => {

})

app.post("/add-ingredients", (req, res) => {
    res.status(200).send("OK")
})

app.post("/del-ingredient", (req, res) => {
    res.status(200).send("OK")
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})