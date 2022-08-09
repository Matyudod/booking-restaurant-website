const { ErrorMessageConfig } = require("../../business/config/ErrorMessageHandler");
const _ErrorMessageConfig = new ErrorMessageConfig()
class Error {
    constructor(){
        
    }
    GetMessage(){
        return _ErrorMessageConfig.error_login;
    }
}
module.exports = {Error};