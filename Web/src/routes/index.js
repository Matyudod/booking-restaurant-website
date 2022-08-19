const dumyData = require("../../seeders");
const userRouter = require("./user");
function route(app) {
  app.use("/api/user", userRouter);

  // app.get("/mockup-data",(req,res)=>{
  //     dumyData(25);
  //     res.send("true");
  // });
}
module.exports = route;
