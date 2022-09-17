const dumyData = require("../../seeders");
const userRouter = require("./user");
const tableRouter = require("./table");
const foodRouter = require("./food");
const authentication = require("../app/middlewares/authentication");
const checkAdmin = require("../app/middlewares/check-admin");
function route(app) {
    let urlDefault = "/api/";
    app.use(urlDefault + "user", userRouter);
    app.use(urlDefault + "table", tableRouter);
    app.use(urlDefault + "food", foodRouter);
    app.use(urlDefault + "book-a-table", tableRouter);

    app.get("/mockup-data", (req, res) => {
        dumyData(25);
        res.send("true");
    });
}
module.exports = route;
