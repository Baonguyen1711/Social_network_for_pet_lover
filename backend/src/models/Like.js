const { json } = require("express");
const mongoose = require("mongoose");
//const bcrypt = require('bcrypt')
mongoose.set("debug", true);

const FashionSocial = mongoose.connection.useDb("FashionSocial");

const LikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  timeStamp: {
    type: Date,
    require: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Like = FashionSocial.model("Like", LikeSchema);

module.exports = Like;
