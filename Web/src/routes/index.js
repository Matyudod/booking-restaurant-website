const dumyData = require("../../seeders");
const userRouter = require("./user");
const tableRouter = require("./table");
const checkAuthMiddleware = require("../app/Businesses/CheckAuth");
const checkAdminMiddleware = require("../app/Businesses/CheckAdmin");
function route(app) {
    let urlDefault = "/api/";
    app.use(urlDefault + "user", userRouter);
    app.use(urlDefault + "table", tableRouter);

    // app.get("/mockup-data",(req,res)=>{
    //     dumyData(25);
    //     res.send("true");
    // });
}
module.exports = route;
