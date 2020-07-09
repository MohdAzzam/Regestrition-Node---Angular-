const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique:true,
    match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  },
  password: {
    type: String,
    require: true
  },
  firstName:{
    type:String,
    require:true
  },
  lastName:{
    type:String,
    require:true
  },
  phoneNumber:{
    type:String,
    require:true
  },
  token:{
    type:String,
  },

});

module.exports = User = mongoose.model("User", UserSchema);