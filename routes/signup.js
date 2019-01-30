var express = require('express');
var router = express.Router();
var User = require("../models/register")
var FabricCAClient = require("../fabric-sdk/fabric-ca-client/lib/FabricCAClient")


/* CREATES NEW USER */
router.post('/user', function(req, res, next) {

  var param = {
    'email':req.body.email,
    'username':req.body.username,
    'password':req.body.password,
    'phone':req.body.phone
};

console.log(JSON.stringify(param))

User.findOne({'email': param.email}, function (error, results) {
        if(error){
            res.send({
                'code':400,
                'data':error
            });
        }else{
             if(!results){
                 /*db query*/
                 var newuser = new User();
                 newuser.email = param.email;
                 newuser.username = param.username;
                 newuser.password = newuser.generateHash(param.password);
                 newuser.phone = param.phone;

                 newuser.save(function (error, savedUser){
                     if (error){
                         res.send({
                             'code':400,
                             'data':error
                         });
                     }else {
                         res.send({
                             'code':200,
                             'data':savedUser
                         });
                     }
                 });

             }else{
                 res.send({
                     'code':300,
                     'data':"user exists"
                 });
             }

        }
  });

}); 


router.post('/register', function(req, res, next) {

    var param = {
        'email':req.body.email,
        'username':req.body.username,
        'password':req.body.password,
        'phone':req.body.phone
    };

    console.log(JSON.stringify(param))

    // res.json(param)
    // register.register(param.username, , "admin", "admin", "1", param.email, param.phone)
    // register({enrollmentID: param.username, affiliation: 'org1.department1',role: 'client'}, admin_user);

	return FabricCAClient.register({enrollmentID: param.username, enrollmentSecret: param.password, affiliation: param.phone, maxEnrollments: -1, attrs:""}, "signingIdentity" )
}); 

module.exports = router;
