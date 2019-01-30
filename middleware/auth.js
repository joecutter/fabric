const validateToken = (error, res, next)=>{
    try{
        jwt.verify(req.headers.authorization,"secretKey", function(err, verify){
            if(!err){
                next()
            }else{
                res.status(400).json({
                    "msg":"Error Occurred "+err
                }) 
            }
        })
    }catch(error){
        res.status(400).json({
            "msg":"Auth token failed or invalid "+error
        })
    }

}

module.exports = validateToken;