const mangoose = require("mongoose");
const Schema = mangoose.Schema;
const ClassName = new mangoose.Schema(
  {
    _id: mangoose.Schema.Types.ObjectId,
    name: {
      type: String,
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mangoose.model("ClassName", ClassName);
