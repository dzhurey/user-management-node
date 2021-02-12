const passport = require('passport')
const moment = require('moment')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const config = require('../../config')
const { UnauthorizedError } = require('../utils/exception')
const getUserByService = require('../services/users/getUserByService')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        try {
            const user = await getUserByService('email', email)
            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.' })
            }
            if (!user.comparePassword(password)) {
                return cb(null, false, { message: 'Incorrect email or password.' })
            }
            const expiresIn = moment().add(1, 'days')
            const tenants = user.UserTenants
            const tenant = tenants[0]
            tenant.isCurrent = true
            const payload = {
                userId: user.id,
                email: user.email,
                expiresIn
            }
            await tenant.save()
            return cb(null, payload, { message: 'Logged In Successfully' })
        } catch (error) {
            cb(error)
        }
    }
))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.apps.secret
},
    async function (payload, cb) {
        try {
            const now = moment()
            const expiresIn = moment(payload.expiresIn)

            if (!now.isSameOrBefore(expiresIn)) {
                return cb(new UnauthorizedError('Token expired!'));
            }
            const user = await getUserService(payload.userId)

            return cb(null, user)
        } catch (error) {
            return cb(error)
        }
    }
));
