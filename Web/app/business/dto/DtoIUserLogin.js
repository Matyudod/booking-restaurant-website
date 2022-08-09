class DtoIUserLogin {
    username = new String();
    password = new String();
    constructor(formdata){
        try{
            this.username = formdata.username;
            this.password = formdata.password;
        }
        catch(ex) {
            throw ex;
        }
    }
    Empty(){
        if(this.username == null || this.password == null){
            return true;
        } else{
            return false;
        }
    }
}
module.exports = {DtoIUserLogin};