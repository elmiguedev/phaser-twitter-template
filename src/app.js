const express = require("express");
const app = express();

app.use("/", express.static("dist"));
app.get("/test", (req, res) => {
    res.send("Hello express");
})

app.listen(8081, () => {
    console.log(__dirname);

    console.log("server escuchando en el 8081 yea2");
})