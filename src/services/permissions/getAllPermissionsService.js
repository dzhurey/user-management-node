const { Permission } = require('../../models')
const { getOpByOperator } = require('../../utils/queryHelper')


const generateWhere = (filter = {}) => {
  const where = {}
  if (filter.name) {
    where.name = {
      [getOpByOperator(filter.name.operator)]: filter.name.value
    }
  }
  return where
}

module.exports = async (params) => {
  const where = generateWhere(params.filter)
  const result = await Permission.paginate({
    where,
    order: params.sort,
    page: params.page.number,
    paginate: params.page.size
  })
  return {
    data: result.docs,
    pagination: {
      number: params.page.number,
      size: params.page.size,
      pages: result.pages,
      total: result.total
    }
  }
}