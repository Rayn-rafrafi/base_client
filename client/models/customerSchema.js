const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// define the Schema (the structure of the article)
const userSchema = new Schema({
  name: String,
  lastname:String,
  email:String,
  phonenumber:String,
  age:Number,
  country:String,
  gender:String,

},
{timestamps:true});




// Create a model based on that schema
const User = mongoose.model("custmoer", userSchema);




// export the model
module.exports = User












