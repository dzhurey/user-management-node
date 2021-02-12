const { User, Role, UserTenant, Group, Tenant, GroupPermissionAccess, Permission, Access } = require('../../models')
const { NotFoundError } = require('../../utils/exception')

module.exports = async (field, value) => {
  const user = await User.findOne({
    where: {
      [field]: value
    },
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
  if (!user) {
    throw new NotFoundError('User not found!')
  }
  return user
}
