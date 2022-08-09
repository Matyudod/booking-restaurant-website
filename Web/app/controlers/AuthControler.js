
const {Error} = require("../modules/error/errorHandler");
const {DtoIUserLogin} = require("../business/dto/DtoIUserLogin");
const _Error = new Error();
class Auth {

    constructor() {}

    login(req,res) {
        try{
            let userLogin = new DtoIUserLogin(req.body);
            console.log(userLogin);
            if(!userLogin.Empty()) {
                res.send(userLogin);
            }else{
                res.send(_Error.GetMessage());
            }
        }
        catch(ex) {
            res.send(_Error.GetMessage());
        } 
    }

    signup() {
        //Linh thieu lang
    }
    
    authorize(){}
}
module.exports = {Auth}