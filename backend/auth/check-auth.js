const jwt =require("jsonwebtoken");
const key = require("../mysetup/myurl");
module.exports=(req,res,next)=>{
    try{
        const decoded=jwt.verify(req.body.token,key.secret);
        req.userData =decoded;
        next();
       }
    catch(error){   
        return res.status(401).json({
            massege: 'Faild'
        })
    }

        };