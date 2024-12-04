const Follows = require("../models/Follows");
const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");
const connectToDb = require("../config/database/db");
mongoose.set("debug", true);

class FollowController {
  //[POST]
  async createFollow(req, res) {
    try {
      const { followerId, followingId } = req.body;
      if (!followerId || !followingId) {
        return res
          .status(400)
          .json({ message: "Missing followerId or followingId" });
      }
      // Kiểm tra xem đã có bản ghi trong bảng follows hay chưa
      let followRecord = await Follows.findOne({ followerId, followingId });

      if (followRecord) {
        // Nếu bản ghi đã tồn tại, nhưng bị hủy theo dõi trước đó, cập nhật lại isDelete
        if (followRecord.isDelete) {
          followRecord.isDelete = false;
          followRecord.dateTime = new Date();
          await followRecord.save();
        }
      } else {
        // Nếu bản ghi chưa tồn tại, tạo một bản ghi mới
        followRecord = new Follows({
          followerId: followerId,
          followingId: followingId,
          dateTime: new Date(),
          isDelete: false,
        });
        await followRecord.save();
      }

      return res.status(200).json({
        message: "Followed successfully",
      });
    } catch (e) {
      console.log("Error following user", e);
      res.status(500).json({ message: "Error following user" });
    }
  }

  async createIgnore(req, res) {
    console.log("Create example");
    try {
      const { ignorerId, ignoringId } = req.body;
      if (!ignorerId || !ignoringId) {
        return res
          .status(400)
          .json({ message: "Missing followerId or followingId" });
      }
      console.log(ignorerId, ignoringId);
      // Kiểm tra xem đã có bản ghi trong bảng follows hay chưa
      let followRecord = await Follows.findOne({
        followerId: ignorerId,
        followingId: ignoringId,
      });

      if (followRecord) {
        // Nếu bản ghi đã tồn tại, nhưng bị hủy theo dõi trước đó, cập nhật lại isDelete
        if (!followRecord.isIgnore) {
          followRecord.isIgnore = true;
          await followRecord.save();
        }
      } else {
        // Nếu bản ghi chưa tồn tại, tạo một bản ghi mới
        followRecord = new Follows({
          followerId: ignorerId,
          followingId: ignoringId,
          dateTime: new Date(),
          isDelete: true,
          isIgnore: true,
        });
        await followRecord.save();
      }

      return res.status(200).json({
        message: "Ignore successfully",
      });
    } catch (e) {
      console.log("Error ignore user", e);
      res.status(500).json({ message: "Error ignore user" });
    }
  }

  async getNotFollows(req, res) {
    try {
      connectToDb();
      const { followerEmail } = req.query;
      // Bước 1: Lấy danh sách những người mà người dùng đã follow (isDelete = false)
      const following = await Follows.find({
        followerId: followerEmail,
        isDelete: false,
      }).populate("followingId");
      const ignoring = await Follows.find({
        followerId: followerEmail,
        isDelete: true,
        isIgnore: true,
      }).populate("followingId");
      // Lấy danh sách UserID của những người đã follow
      const followingEmails = following.map((follow) => follow.followingId);
      console.log("followingEmails",followingEmails);
      //Laysay danh sách UserID của ngững người đã ignore
      const ignoringEmails = ignoring.map((ignore) => ignore.followingId);
      // Bước 2: Lấy danh sách những người chưa follow (exclude người dùng hiện tại và những người đã follow)
      const notFollowed = await User.find({
        email: { $nin: [followerEmail, ...followingEmails, ...ignoringEmails] },
      });
  
      res.json({
        notFollowed: notFollowed,
      });
    } catch (e) {
      console.log(e);
    }
  }

 
}

module.exports = new FollowController();
