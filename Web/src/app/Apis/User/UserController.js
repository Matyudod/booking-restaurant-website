const models = require("../../../../models")
const errorProvider = require("../../Businesses/ErrorProviders")
const createToken = require("../../Businesses/RandomToken")
const bcrypt = new require('bcrypt');
class UserController {


    loginHandler(req,res) {
        try{
            if(req.body.username == null || req.body.password == null ){
                res.status(200).json(errorProvider.errorLoginFieldIsNull)
            }
            else {
                let user = {
                    username: req.body.username,
                    password: req.body.password,
                    status: true
                }
                models.Users.findOne({
                    where: { 
                        username: user.username,
                        status: user.status
                    },
                }).then(result=>{
                    if(result != null){
                        bcrypt.compare(user.password, result.password,async function(err, correct) {
                            if(correct){
                                models.Users.update({
                                    token : createToken()
                                }, {
                                    where: {
                                        username: user.username,
                                        status: user.status
                                    }
                                }).then(result => {
                                    models.Users.findOne({
                                        where: { 
                                            username: user.username,
                                            status: user.status
                                        },
                                    }).then(result => {
                                        res.status(200).json({data : result, message : errorProvider.successLoginComplete})
                                    }).catch(err => {
                                        res.status(500).json(errorProvider.APIErrorServer)
                                    })
                                })
                            } else {
                                res.status(200).json(errorProvider.errorLoginFieldIncorrect)
                            }
                        })
                    }
                }).catch (error =>{
                    res.status(500).json(errorProvider.APIErrorServer)
                })
            }
        } catch (ex){
            res.status(500).json(errorProvider.APIErrorServer)
        }
    }
    
    signupHandler(req,res) {
        try{
            if(req.body.username == null || req.body.password == null || req.body.name == null || req.body.email == null || req.body.birthday == null){
                res.status(200).json(errorProvider.errorSignupFieldIsNull)
            }
            else {
                let user = {
                    name: req.body.name,
                    email: req.body.email,
                    username: req.body.username,
                    password: bcrypt.hashSync(req.body.password,10),
                    birthday: req.body.birthday,
                    is_admin: false,
                    status: true,
                    token : createToken()
                }
                
                models.Users.findOne({
                    where: { 
                        username: user.username,
                        status: user.status
                    },
                }).then((result)=> {
                    if(result == null){
                        models.Users.create(user).then(result=>{
                            models.Users.findOne({
                                where: { 
                                    username: user.username,
                                    status: user.status
                                },
                            }).then(newUser => {
                                res.status(200).json({data : newUser, message : errorProvider.successSignupComplete})
                            }).catch(error => {
                                res.status(500).json(errorProvider.APIErrorServer)
                            })
                        }).catch(err=>{
                            res.status(500).json(errorProvider.APIErrorServer)
                        })
                        
                    } else {
                        res.status(200).json(errorProvider.errorSignupUserExisted)
                    }
                }).catch(error => {
                    res.status(500).json(errorProvider.APIErrorServer)
                })
            }
        }catch (ex){
            res.status(400).json(ex)
        }
    }   

}
module.exports = new UserController;