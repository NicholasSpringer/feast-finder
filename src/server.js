const express = require("express");
const app = express();
const PORT = 3001;

app.get("get-ingredients", (req, res) => {

})

app.get("get-recipes", (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})