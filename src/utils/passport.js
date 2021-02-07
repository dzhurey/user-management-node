const passport = require('passport')
const moment = require('moment')
const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const config = require('../../config')
const { User, Role, UserTenant, Group, Tenant, GroupPermissionAccess, Permission, Access } = require('../models')
const { UnauthorizedError } = require('../utils/exception')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({
            where: { email },
            include: [
                Role,
                {
                    model: UserTenant,
                    include: [
                        {
                            model: Group,
                            include: [
                                {
                                    model: GroupPermissionAccess,
                                    include: [Permission, Access]
                                }
                            ]
                        },
                        Tenant
                    ]
                }
            ]
        })
            .then(user => {
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
                tenant.save().then(() => {
                    const payload = {
                        userId: user.id,
                        email: user.email,
                        roles: user.Roles.map(r => r.name),
                        tenant: {
                            id: tenant.Tenant.id,
                            name: tenant.Tenant.name
                        },
                        group: {
                            id: tenant.Group.id,
                            name: tenant.Group.name
                        },
                        permissions: tenant.Group.GroupPermissionAccesses.map(a => `${a.Permission.name}__${a.Access.name}`),
                        expiresIn
                    }
                    return cb(null, payload, { message: 'Logged In Successfully' })
                })
            })
            .catch(err => cb(err))
    }
))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.apps.secret
},
    function (payload, cb) {
        const now = moment()
        const expiresIn = moment(payload.expiresIn)

        if (!now.isSameOrBefore(expiresIn)) {
            return cb(new UnauthorizedError('Token expired!'));
        }
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findOne({ where: { id: payload.userId } })
            .then(() => {
                return cb(null, payload);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
