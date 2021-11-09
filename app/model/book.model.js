const mangoose = require("mongoose");
const Schema = mangoose.Schema;
const Book = new mangoose.Schema(
  {
    _id: mangoose.Schema.Types.ObjectId,
    name: {
      type: String,
    },
    isbn:{
      type:String
    },
    authorName: {
      type: Array,
    },
    publisherName: {
      type: Array,
    },
    publishingYear: {
      type: String,
    },
    part: {
      type: Array,
    },
    edition: {
      type: Array,
    },
    language:{
      type:String
    },
    subjectId: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  },
  {
    versionKey: false,
  }
);
module.exports = mangoose.model("Book", Book);
