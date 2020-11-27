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
            {title: "Fried Rice", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.",
             ingredients: ["Rice", "Eggs", "Chives"]},
        burger: 
            {title: "Cheeseburger", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Beef", "Salt", "Bun"]},
        fried_rice1: 
            {title: "Fried Rice", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Rice", "Eggs", "Chives"]},
        burger1: 
            {title: "Cheeseburger", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Beef", "Salt", "Bun"]},
        fried_rice2: 
            {title: "Fried Rice", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Rice", "Eggs", "Chives"]},
        burger2: 
            {title: "Cheeseburger", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Beef", "Salt", "Bun"]},
        fried_rice3: 
            {title: "Fried Rice", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Rice", "Eggs", "Chives"]},
        burger3: 
            {title: "Cheeseburger", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Beef", "Salt", "Bun"]},
        fried_rice4: 
            {title: "Fried Rice", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Rice", "Eggs", "Chives"]},
        burger4: 
            {title: "Cheeseburger", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Beef", "Salt", "Bun"]},
        fried_rice5: 
            {title: "Fried Rice", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Rice", "Eggs", "Chives"]},
        burger5: 
            {title: "Cheeseburger", description: "Lorem ipsum dolor sit amet, consectetur \
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna \
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris \
            nisi ut aliquip ex ea commodo consequat.", ingredients: ["Beef", "Salt", "Bun"]},
        }
    )
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