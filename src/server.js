const express = require("express");
const app = express();
const PORT = 9000;

var cors = require("cors");
app.use(cors());

app.get("/get-ingredients", (req, res) => {
    res.json({ingredients: ["Rice", "Bun"]})
})

app.get("/get-recipes", (req, res) => {
    res.json(
        {fried_rice: 
            {title: "Fried Rice", description: "Easy yummy fried rice with no wok!", ingredients: ["Rice", "Eggs", "Chives"]},
        burger: 
            {title: "Cheeseburger", description: "Yum", ingredients: ["Beef", "Salt", "Bun"]}}
    )
})

app.post("/add-ingredients", (req, res) => {
    console.log(req.body)
    res.status(200).send("OK")
})

app.post("/del-ingredient", (req, res) => {
    console.log(req.body)
    res.status(200).send("OK")
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})