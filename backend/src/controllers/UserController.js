const User = require('../models/user')
const connectToDb = require('../../src/config/database/db')

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

    //[GET] getBillingAddress
    async getBillingAddress(req,res) {
        try {
            await connectToDb()

            const {email} = req.query

            const user = await User.findOne({email: email})
            if(user) {
                res.status(200).json(user.billingAddress)
            } else {
                res.status(404).send('User not found')
            }
        } catch(e) {
            console.log('Some errors happen', e)
        }
    }


    //[POST] setBillingAddress
    async setBillingAddress(req, res) {

        try {
            await connectToDb()

            const [firstNameObj,
                lastNameObj,
                companyNameObj,
                countryObj,
                provinceObj,
                districtObj,
                communeObj,
                detailAddressObj,
                emailObj] = req.body

            const firstName = firstNameObj.value
            const lastName = lastNameObj.value
            const companyName = companyNameObj.value
            const country = countryObj.value
            const province = provinceObj.value
            const district = districtObj.value
            const commune = communeObj.value
            const detailAddress = detailAddressObj.value
            const email = emailObj.value

            const user = await User.findOne({ email: email })

            const billingAddressUpdate = {
                lastName: lastName,
                firstName: firstName,
                companyName: companyName,
                country: country,
                province: province,
                district: district,
                commune: commune,
                detailAddress: detailAddress
            }

            user.billingAddress = {
                ...billingAddressUpdate
            };

            console.log(user.billingAddress )

            await user.save()

            if (!user) {
                res.status(404).send('User not found')
            } else {
                res.status(200).send('Add address successfully')
            }
        } catch (e) {
            console.log('Some errors happen', e)
        }

    }

    // async delete(req,res) {
    //     res.status(204).send();
    // }
}

module.exports = new UserController

