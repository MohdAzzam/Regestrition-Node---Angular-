const express  = require("express");
const router   = express.Router();
const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const ObjectID = require('mongodb').ObjectID;

const User = require("../models/User");
const key = require("../mysetup/myurl");


router.post("/signup",(req, res, next)=>{
  User.find({email:req.body.email})
  .exec()
  .then(user=>{
    if(user.length>=1){
      return res.status(409).json({
        message:'Mail exists'
      });
    }
    else{
         
    bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err){
      return res.status(500).json({
        error: err
      });
    }
    
    else{
      const token=jwt.sign({
        email :req.body.email,
        userId:req.body.phoneNumber
      }
      ,key.secret
      ,{
        expiresIn:"6h"
      },);
      const user =new User({
        email       :     req.body.email,
        password    :     hash,
        firstName   :     req.body.firstName,
        lastName    :     req.body.lastName,
        phoneNumber :     req.body.phoneNumber,
        token : token
      })
        user.save()
        
        .then(result=>{
          console.log(result);
          res.status(201).json({
            message: 'User Created ',
            token : token
          });
        })
        
        
    }
  });
    }
  })


});

router.get("/users",(req,res,next)=>{
  User.find()
  .exec()
  .then(user=>{
    return res.status(200).json({
      users: user,
    });
  });
});


router.post("/login",(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
          return res.status(401).json({
            message:'auth failed'
          });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
          if(err){
             return res.status(401).json({
               message:'Auth failed'
             });

          }
          if(result){
              const token=jwt.sign({
                email :user[0].email,
                userId:user[0]._id
              }
              ,key.secret
              ,{
                expiresIn:"6h"
              },)
              const userID = new ObjectID(user[0]._id);
              User.findOneAndUpdate({email:user[0].email },{token: token}).then(response=>{
                return res.status(200).json({
                  token : token
                });
              }).catch(err=>{
                console.log(err);
                res.status(500).json({
                  error : err
                });
              });
         
              //user.save();
              
          }else{
            res.status(401).json({
              message:'Auth failed'
            });
          }
         
        });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error : err
      });
    });
});
router.delete("/:userId",(req,res,next)=>{
  User.remove({_id:req.params.userId})
  .exec()
  .then(result=>{
    res.status(200).json({
      message:'User Deleted'
    });
  })
  .catch(err=>{
          console.log(err);
          res.status(500).json({
            error : err
          });
        });
    
});

router.get('/me',(req,res,next)=>{
  const token = req.headers.authorization ;  
    User.findOne({ 
      token : token
    })
    .then(user=>{
      if(user){
        res.json(user)
      }
      else{
        res.send("User Not Found")
      }
    })
    .catch(err=>{
      res.status(401).json({
        message:"NO User At all"
      })
    });
})


module.exports = router;