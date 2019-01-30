var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const uuidV4 = require('uuid.v4'); 
const Login = require('../models/register')
const conn = require('../dbConfig/mongo')
const secretKey = uuidV4();


/** A user can login from here. */
router.post('/', function(req, res, next) {

    var user = {
      "username": req.body.email,
      "password": req.body.password
  };

  Login.findOne({"email": req.body.email}, function(error, data){
      if(error){
        res.send({
          "code":400,
          "data":error
        })
      }else{
        if(data != null){
          if(!data.validPassword(req.body.password)){
              res.send({
                "code": 204,
                "success": "Wrong Password"
            });
          }else{
            /** SETTING JWT TOKEN */
            var token = jwt.sign(user, "secretKey",{ expiresIn: '1h' });
              res.send({
                "code": 200,
                "success": "Successfully logged in",
                "username": data.username,
                "token":token
            });
          }

        }else{
            res.send({
                "code":300,
                'success':"User Doesn't Exist, Please Register"
            });
        }
      }
  })

});

module.exports = router;
