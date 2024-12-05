const Post = require("../models/Post");
const mongoose = require("mongoose");
const connectToDb = require("../config/database/db");
const { ObjectId } = require("mongodb");  
const User = require("../models/User");
mongoose.set("debug", true);

class PostController {
  //[POST]
  async create(req, res) {
    try {
      connectToDb();
      const { userId, title, content, imgUrl } = req.body;
      if (!userId || !title || !content) {
        return res
          .status(400)
          .json({ message: "Not enough required information!" });
      }
      const newPost = Post({
        userId: new ObjectId(`${userId}`),
        title: title,
        content: content,
        images: imgUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDelete: false,
      });
      await newPost.save();

      return res.status(200).json({
        message: "create post successfully",
        newpost: newPost,
      });
    } catch (e) {
      console.log("Some error in registration. Try again!!", e);
    }
  }

  async getAllPost(req, res) {
    try {
      connectToDb();

      const recentPostsArray = await Post.aggregate([
        //get all recieved messages
        {
          $match: {
            isDeleted: false,
          },
        },
        //sort by latest sent message
        {
          $sort: {
            updateAt: -1,
          },
        },
      ]);

      const postExplores = recentPostsArray.length > 0 ? recentPostsArray : [];

      res.json({
        recommentPost: postExplores,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async getPostsByUserId(req, res) {
    try {
      const {userId} = req.query;
      if (!ObjectId.isValid(userId)) {
        return res.status(400).send({ error: 'Invalid userId format',userId });
    }
      connectToDb();

      const user = await User.findById(userId,{avatar:1});
      const posts = await Post.aggregate([
        {
          $match: {
            userId: new ObjectId(`${userId}`),
            isDeleted: false,
          },
        },
        {
          $sort: {
            createdAt: -1,
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
            foreignField: "targetId", 
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
                cond: { $eq: ["$$like.userId", new ObjectId(`${userId}`)],$eq: ["$$like.isDeleted", false] }, // Điều kiện lọc
              },
            },0]
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
            isLiked:1
          },
        },
      ]);
      res.status(200).json({ posts:posts,user:user });
    } catch (e) {
      console.log(e);
    }
  }

  async getPostById(req, res) {
    try {
      const postId = req.query;
      if (!postId) {
        return res.status(400).json({ error: "pId is required" });
      }
      connectToDb();
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
            foreignField: "email", // Trường trong User
            as: "userInfo", // Tên trường chứa kết quả nối
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
            likeInfo: 1
          },
        },
      ]).then((results) => results[0]);
      res.json({ post });
    } catch (e) {
      console.log(e);
    }
  }

  async deletePostById(req, res) {
    try {
      const { postId } = req.query;
      if (!postId) {
        return res.status(400).json({ error: "postId is required" });
      }
      connectToDb();
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { isDeleted: true, updatedAt: new Date() },
        { new: true }
      );

      if (updatedPost) {
        res.status(200).send({
          message: "Post deleted successfully",
          deletedPost: updatedPost,
        });
      } else {
        res.status(400).send({ message: "Post not found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server error" });
    }
  }
}

module.exports = new PostController();
