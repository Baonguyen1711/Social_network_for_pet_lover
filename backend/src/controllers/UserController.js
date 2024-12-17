const User = require("../models/User")
const Pet = require("../models/Pet")
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const connectToDb = require("../config/database/db");
mongoose.set("debug", true);

class UserController {

    //[GET] user info
    async getInfo(req, res) {
        await connectToDb()
        const { email } = req.query

        const userInfo = await User.findOne({ email })

        try {
            if (userInfo) {
                res.json({
                    "userInfo": userInfo
                })
            } 
        } catch (e) {
            console.log('Some errors happen', e)
        }
    }

    async setAvatar(req,res) {
        await connectToDb()
        const { email, avtar } = req.query

        const user = await User.find({ email })

        try {
            if (user) {
                user.avtar = avtar
                await user.save()
                res.status(200).json(user)
            } else {
                res.status(404).send('email not found')
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }
    }
  
    async getUserById(req,res)
  {
    try{
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }
      if (!ObjectId.isValid(userId)) {
        return res.status(400).send({ error: 'Invalid userId format',userId });
    }
      await connectToDb();
      const user = await User.findOne({ _id: new ObjectId(`${userId}`) },{avatar:1,description:1,firstname:1,lastname:1,location:1});
      if (user) {
        const petCount = await Pet.countDocuments({userId:new ObjectId(`${userId}`),isDeleted:false})
        const result ={
          ...user.toObject(),
          petCount:petCount
        }
        return res.json({ user:result });
      }else {
        return res.status(404).json({ error: "User not found" });
      } 
    }
    catch(e)
    {
      console.log(e)
    }
  }

    // async getAvatar(req,res) {
    //     await connectToDb()
    //     const { email, avtar } = req.query

    //     const user = await User.find({ email })

    //     try {
    //         if (user) {
    //             user.avtar = avtar
    //             await user.save()
    //             res.status(200).json(user)
    //         } else {
    //             res.status(404).send('email not found')
    //         }
    //     } catch (e) {
    //         console.log('Some errors happen', e)
    //     }
    // }

    // async delete(req,res) {
    //     res.status(204).send();
    // }
}

module.exports = new UserController


