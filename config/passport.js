const mongoose = require('mongoose')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.SECRET
}

const User = mongoose.model('User')

passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findOne({ _id: jwtPayload._id }, (err, user) => {
        if (err) {
            next(err)
        }
        if (user) {
            return done(null, user)
        }
        else {
            return done(null, false)
        }
    })
        
}))