const User = require('../models/User')
      jwt = require('jsonwebtoken')
      config = require('config')
      bcrypt = require('bcrypt')

module.exports.signup = (req, res) => {
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400).json({msg: "Please enter all the fields"})
    }

    User.findOne({email})
    .then(user => {
        if(user) return res.status(400).json({msg: "User already exists"})
    })

    const newUser = new User({ name, email, password})

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, hash, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {
                jwt.sign(
                    {id: user_id},
                    config.get('jwtsecret'),
                    {expiresIn: 3600},
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user._id,
                                name: user.name,
                                email: user.name
                            }
                        })
                    }
                )
            })
        })
    })
}