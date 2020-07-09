
var express = require("express");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var db = require("./mysetup/myurl").myurl;
var app = express();
var UserRoutes = require("./routes/User");
var cors = require('cors')

var port = process.env.PORT || 3001;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
// app.use(req,res,next=>{
//   res.header('Access-Control-Allow-Origin','*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin','X-Requested-With','Content-Type','Accept','Authorization');
//     if(req.method==='OPTIONS'){
//       res.header('Access-Control-Allow-Method','PUT,POST,GET,PATH,DELETE')
//       return res.status(200).jason({});
//     }  

// });

mongoose
  .connect(db)
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log("Error is ", err.message);
  });

//Passport middleware
// app.use(passport.initialize());

//Config for JWT strategy
// require("./strategies/jsonwtStrategy")(passport);

app.get("/", (req, res) => {
  res.status(200).send(`Hi Welcome to the Login and Signup API`);
});


// const profile = require("./routes/User");
app.use("/user",UserRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});