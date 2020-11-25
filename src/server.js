const express = require("express");
const app = express();
const PORT = 3001;

app.get("get-user", (req, res) => {
    user_id = req.params.id
})

app.get("get-recipes", (req, res) => {
    ingredient_list = req.params.ingredients
    // access db
    // get recipe list
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})