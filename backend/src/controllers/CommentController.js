const mongoose = require("mongoose");
const connectToDb = require("../config/database/db");
const Comment = require("../models/Comment");
const { ObjectId } = require("mongodb");

mongoose.set("debug", true);

class CommentController {
  //[POST]
  async create(req, res) {
    try {
      connectToDb();
      const { content, postId, userId, parentId } = req.body;
      const validatedParentId = ObjectId.isValid(parentId) ? parentId : null;
      if (!content || !postId || !userId) {
        return res.status(400).json({
          message:
            "Missing required fields: content, postId, and userId are required.",
        });
      }
      const newComment = Comment({
        content: content,
        postId: postId,
        userId: userId,
        parentId: validatedParentId,
        createAt: new Date(),
        isDeleted: false,
      });

      await newComment.save();
      const resultArray = await Comment.aggregate([
        { $match: { _id: newComment._id } },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "userId",
            as: "userInfo",
          },
        },
        {
          $addFields: {
            userInfo: {
              $let: {
                vars: { user: { $arrayElemAt: ["$userInfo", 0] } }, // Lấy user đầu tiên
                in: {
                  firstname: "$$user.firstname", // Chỉ lấy thuộc tính name
                  lastname: "$$user.lastname",
                  avatar: "$$user.avatar", // Nếu cần thêm thuộc tính, bạn có thể thêm ở đây
                },
              },
            },
          },
        },
        {
          $match: { parentId: null },
        },
      ]);
      const result = resultArray.length > 0 ? resultArray[0] : null;
      console.log("resuldsdsdt",result)

      if (result) {
        return res.status(200).json({
          message: "Comment created successfully.",
          newComment: result,
        });
      } else {
        return res.status(404).json({ message: "Comment not found or doesn't meet criteria." });
      }
    } catch (e) {
      console.error("Error while creating a comment:", e);
      return res.status(500).json({
        message:
          "An error occurred while creating the comment. Please try again later.",
      });
    }
  }

  async getCommentByPostId(req, res) {
    try {
      connectToDb();
      const { postId } = req.query;
      if (!postId) {
        res.status(400).json({
          message: "Missing required fields: postId",
        });
      }
      const comments = await Comment.aggregate([
        { $match: { postId: new ObjectId(`${postId}`) } },
        {
          $graphLookup: {
            from: "comments", // Tên collection
            startWith: "$_id", // Bắt đầu từ chính comment hiện tại
            connectFromField: "_id", // Liên kết từ _id
            connectToField: "parentId", // Kết nối với parentId
            as: "replies", // Tên mảng chứa các trả lời
          },
        },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "userId",
            as: "userInfo",
          },
        },
        {
          $addFields: {
            userInfo: {
              $let: {
                vars: { user: { $arrayElemAt: ["$userInfo", 0] } }, // Lấy user đầu tiên
                in: {
                  firstname: "$$user.firstname", // Chỉ lấy thuộc tính name
                  lastname: "$$user.lastname",
                  avatar: "$$user.avatar", // Nếu cần thêm thuộc tính, bạn có thể thêm ở đây
                },
              },
            },
          },
        },
        {
          $match: { parentId: null }, // Chỉ lấy các comment cấp 1
        },
        {
          $sort: { createdAt: -1 }, // Sắp xếp giảm dần theo ngày tạo
        },
      ]);
      return res.status(200).json({
        comments: comments,
      });
    } catch (e) {
      console.error("Error while creating a comment:", e);
      return res.status(500).json({
        message:
          "An error occurred while getting the comment. Please try again later.",
      });
    }
  }
}

module.exports = new CommentController();
