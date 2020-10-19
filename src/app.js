const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use("/", express.static("dist"));

app.listen(port, () => {
    console.log(`server listening at port ${port}`);
})