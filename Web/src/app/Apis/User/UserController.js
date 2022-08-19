const models = require("../../../../models");
const errorProvider = require("../../Businesses/ErrorProviders");
const createToken = require("../../Businesses/RandomToken");
const bcrypt = new require("bcrypt");
const Validator = require("fastest-validator");
const scheme = require("../../Businesses/ValidationProviders");
const getListModels = require("../../Businesses/GetListSupporter");
const getOne = require("../../Businesses/GetOneSupporter");
const update = require("../../Businesses/UpdateSupporter");
const updateStatus = require("../../Businesses/UpdateStatusSuporter");
class UserController {
  loginHandler(req, res) {
    try {
      let user = {
        username: req.body.username,
        password: req.body.password,
        status: true,
      };
      const v = new Validator();
      let validationResponse = v.validate(user, scheme.loginValidation);
      if (validationResponse !== true) {
        res.status(400).json(errorProvider.errorLoginFieldIsNull);
      }

      models.Users.findOne({
        where: {
          username: user.username,
          status: user.status,
        },
      })
        .then((result) => {
          if (result != null) {
            bcrypt.compare(
              user.password,
              result.password,
              async function (err, correct) {
                if (correct) {
                  models.Users.update(
                    {
                      token: createToken(),
                    },
                    {
                      where: {
                        username: user.username,
                        status: user.status,
                      },
                    }
                  ).then((result) => {
                    models.Users.findOne({
                      where: {
                        username: user.username,
                        status: user.status,
                      },
                    })
                      .then((result) => {
                        res.status(200).json({
                          data: result,
                          message: errorProvider.successLoginComplete,
                        });
                      })
                      .catch((err) => {
                        res.status(500).json(errorProvider.APIErrorServer);
                      });
                  });
                } else {
                  res.status(200).json(errorProvider.errorLoginFieldIncorrect);
                }
              }
            );
          }
        })
        .catch((error) => {
          res.status(500).json(errorProvider.APIErrorServer);
        });
    } catch (ex) {
      res.status(500).json(errorProvider.APIErrorServer);
    }
  }

  signupHandler(req, res) {
    try {
      let user = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        birthday: req.body.birthday,
        is_admin: false,
        status: true,
        token: createToken(),
      };

      const v = new Validator();
      let validationResponse = v.validate(user, scheme.signupValidation);
      if (validationResponse !== true) {
        res.status(400).json(errorProvider.errorSignupFieldIsNull);
      }

      models.Users.findOne({
        where: {
          username: user.username,
          status: user.status,
        },
      })
        .then((result) => {
          if (result == null) {
            models.Users.create(user)
              .then((result) => {
                models.Users.findOne({
                  where: {
                    username: user.username,
                    status: user.status,
                  },
                })
                  .then((newUser) => {
                    res.status(200).json({
                      data: newUser,
                      message: errorProvider.successSignupComplete,
                    });
                  })
                  .catch((error) => {
                    res.status(500).json(errorProvider.APIErrorServer);
                  });
              })
              .catch((err) => {
                res.status(500).json(errorProvider.APIErrorServer);
              });
          } else {
            res.status(200).json(errorProvider.errorSignupUserExisted);
          }
        })
        .catch((error) => {
          res.status(500).json(errorProvider.APIErrorServer);
        });
    } catch (ex) {
      res.status(400).json(ex);
    }
  }

  pagination(req, res) {
    getListModels(req.query, models.Users, res);
  }

  detail(req, res) {
    let id = req.params.id;
    getOne(id, models.Users, res, "User");
  }
  updateUserInfo(req, res) {
    let user = {
      id: parseInt(req.body.id),
      name: req.body.name,
      email: req.body.email,
      birthday: new Date(req.body.birthday),
    };
    update(user, scheme.userUpdateValidation, models.Users, res, "User", true);
  }
  deleteUser(req, res) {
    let user = {
      id: parseInt(req.params.id),
    };
    updateStatus(user, models.Users, res, "User", false);
  }
}
module.exports = new UserController();
