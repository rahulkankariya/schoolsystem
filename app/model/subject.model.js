const mangoose = require("mongoose");
const Schema = mangoose.Schema;
const Subject = new mangoose.Schema({
  _id: mangoose.Schema.Types.ObjectId,
  code:{
    type:String
  },
  subjectName: {
    type: String,
  },
  classNameId:{
    type: Schema.Types.ObjectId,
    ref:"ClassName"
  }
},
{
  versionKey:false
});
module.exports = mangoose.model("Subject", Subject);
