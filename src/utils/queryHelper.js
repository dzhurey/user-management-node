const { Op } = require('sequelize')

const getOpByOperator = (operator) => {
  switch (operator) {
    case '=':
      return Op.eq
    case '!=':
      return Op.ne
    case '>':
      return Op.gt
    case '<':
      return Op.lt
    case '>=':
      return Op.gte
    case '<=':
      return Op.lte
    case 'in':
      return Op.in
    case 'not in':
      return Op.notIn
    default:
      throw new error("Operator not found")
  }
}

module.exports = {
  getOpByOperator
}