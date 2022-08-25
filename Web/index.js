const express = require("express");
const route = require("./src/routes/index");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
    })
);
app.use(express.json());

route(app);

app.listen(port, () => {
    console.log(`Server starting on port ${port}`);
});