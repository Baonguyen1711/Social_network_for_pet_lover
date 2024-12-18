const User = require('../../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectToDb = require('../../config/database/db')

class LoginController {
    
    // verify login
    async verify(req,res) {

        connectToDb()
        const JWT_SECRET = process.env.JWT_SECRET
        const {email, password} = req.query
        console.log('abc')
        const user = await User.findOne({email})
        
        console.log('def')
        const isMatched = bcrypt.compare(password, user.password)

        try {
            if (isMatched) {
                const token = jwt.sign({ id: user._id, email: user.email},JWT_SECRET, {expiresIn: '1h'})

                console.log(token)

                res.json({
                    'jwt': token,
                    'user_id': user._id
                })
            } else {
                res.status(401).send('wrong email or password')
            }
        } catch(e) {
            //res.send('Something wrong happens')
            console.log('error', e)
        }
    }

    // async get(req,res) {
    //     res.status(405).send('Method Not Allowed');
    // }
    
}

module.exports = new LoginController