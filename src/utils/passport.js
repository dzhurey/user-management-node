const passport = require('passport')
const moment = require('moment')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../../config')
const { User, Role } = require('../models')
const { UnauthorizedError } = require('../utils/exception')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({ 
            where: { email }, 
            include: Role})
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email or password.' })
                }
                if (!user.comparePassword(password)) {
                    return cb(null, false, { message: 'Incorrect email or password.' })
                }
                const expiresIn = moment().add(1, 'days')
                const payload = {
                    userId: user.id,
                    email: user.email,
                    roles: user.Roles.map(r => r.name),
                    expiresIn
                }
                return cb(null, payload, { message: 'Logged In Successfully' })
            })
            .catch(err => cb(err))
    }
))

// const opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
// opts.secretOrKey = config.apps.secret
// opts.issuer = config.apps.baseURL

// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false)
//         }
//         if (user) {
//             return done(null, user)
//         } else {
//             return done(null, false)
//             // or you could create a new account
//         }
//     })
// }))