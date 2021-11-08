const mangoose = require("mongoose");
const Schema = mangoose.Schema;
const Section = new mangoose.Schema(
  {
    _id: mangoose.Schema.Types.ObjectId,
    classNameId: {
      type: Schema.Types.ObjectId,
      ref: "ClassName",
    },
    name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);
module.exports = mangoose.model("Section", Section);
