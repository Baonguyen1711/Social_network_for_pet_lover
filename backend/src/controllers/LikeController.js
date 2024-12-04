const mongoose = require("mongoose");
const connectToDb = require("../config/database/db");
const Like = require("../models/Like");
const Post = require("../models/Post");
const { ObjectId } = require("mongodb");
mongoose.set("debug", true);

class LikeController {
  async createLikePost(req, res) {
    try {
      await connectToDb();
      const { userId, postId } = req.body;
      console.log(userId, postId)
      if (!userId || !postId) {
        return res
          .status(400)
          .json({ message: "Not enough required information!" });
      }
      if (!ObjectId.isValid(userId)) {
        return res.status(400).send({ error: "Invalid userId format", userId });
      }
      const likeExisting = await Like.findOne({
        userId: new ObjectId(`${userId}`),
        postId: new ObjectId(`${postId}`),
      });

      if (likeExisting) {
        likeExisting.isDeleted = !likeExisting.isDeleted;
        likeExisting.timeStamp = new Date();
        await likeExisting.save();
      } else {
        const newLike = Like({
          userId: new ObjectId(`${userId}`),
          postId: new ObjectId(`${postId}`),
          timeStamp: new Date(),
          isDeleted: false,
        });
        await newLike.save();
      }

      const post = await Post.aggregate([
        {
          $match: {
            _id: new ObjectId(`${postId}`),
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId", // Trường trong Post
            foreignField: "_id", // Trường trong User
            as: "userInfo", // Tên trường chứa kết quả nối
          },
        },
        {
          $unwind: {
            path: "$userInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "postId",
            as: "likeInfo",
          },
        },
        {
          $addFields: {
            likeInfo: {
              $filter: {
                input: "$likeInfo", // Dữ liệu cần lọc
                as: "like", // Biến đại diện cho từng phần tử trong mảng
                cond: { $eq: ["$$like.isDeleted", false] }, // Điều kiện lọc
              },
            },
            isLiked: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$likeInfo", // Dữ liệu cần lọc
                    as: "like", // Biến đại diện cho từng phần tử trong mảng
                    cond: {
                      $and: [
                        { $eq: ["$$like.userId", new ObjectId(`${userId}`)] },
                        { $eq: ["$$like.isDeleted", false] },
                      ],
                    }, // Điều kiện lọc
                  },
                },
                0,
              ],
            },
          },
        },{
          $lookup: {
            from: "users",
            localField: "likeInfo.userId", 
            foreignField: "_id", 
            as: "likedUserInfo", 
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            content: 1,
            images: 1,
            createdAt: 1,
            userId: 1,
            userInfo: 1,
            "likedUserInfo.lastname": 1,
            "likedUserInfo.firstname":1,
            "likedUserInfo._id":1,
            isLiked: 1,
          },
        },
      ]).then((results) => results[0]);
      return res.status(200).json({
        message: "update like successfully",
        updatedPost: post,
      });
    } catch (e) {
      console.log("Some error in registration. Try again!!", e);
      return res.status(404).json({
        message: "Have some errors",
      });
    }
  }
}
module.exports = new LikeController();
