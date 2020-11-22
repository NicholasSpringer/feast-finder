const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
    res.send("This is the homepage");
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
})