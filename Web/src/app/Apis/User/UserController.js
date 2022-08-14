
const bcrypt = new require('bcrypt');
class UserController {

    // loginHandler(req,res) {
    //     if(req.body.username == null || req.body.password == null ){
    //         res.status(200).json({message: "Username or password do not exist.", type_message:"error_dialog"})
    //     }
    //     else {
        
    //         let userLogin = {
    //             username: req.body.username,
    //             password: req.body.password,
    //         }
    //         pool.get_connection(db => {
    //             db.where("username",userLogin.username).where("status",1).get("users",(err,users)=>{
    //                 db.disconnect();
    //                 try{
    //                     let user = users[0];
    //                     bcrypt.compare(userLogin.password, user.password,async function(err, correct) {
    //                         if(correct){
    //                             res.status(200).json({data: user, message: "Sign in completed.", type_message:"success_dialog"});
    //                         } else {
    //                             res.status(200).json({message: "Incorrect username or password.", type_message:"error_dialog"})
    //                         }
    //                     });
    //                 } catch(ex) {
    //                     res.status(200).json({message: "User not found.", type_message:"error_dialog"})
    //                 }
    //             })
    //         });
    //     }
    // }
    
    // signupHandler(req,res) {
    //     if(req.body.username == null || req.body.password == null || req.body.name == null || req.body.email == null){
    //         res.status(400).json({message: "Username or password do not exist.", type_message:"error_dialog"})
    //     }
    //     else {
        
    //         let userSignup = {
    //             name: req.body.name,
    //             email: req.body.email,
    //             username: req.body.username,
    //             password: bcrypt.hashSync(req.body.password,10),
    //         }
    //         console.log(userSignup);
    //         pool.get_connection((db) => {
    //             db.where("username",userSignup.username).where("status",1).get("users",(err,users)=>{
    //                 console.log(users.length);
    //                 if(users.length == 0 ){
    //                     db.insert("users",userSignup,(err,resInsert)=>{
    //                         db.where("username",userSignup.username).where("status",1).get("users",(err,user)=>{
    //                             db.disconnect()
    //                             res.status(200).json({data: user, message: "Sign in completed.", type_message:"success_dialog"})
    //                         })
    //                     })
    //                 } else {
    //                     db.disconnect()
    //                     res.status(400).json({message: "Username is existed.", type_message:"error_dialog"})
    //                 }

    //             })
    //         });
    //     }
    // }   

}
module.exports = new UserController;