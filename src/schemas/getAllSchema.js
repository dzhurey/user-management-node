const validation = require('../utils/validation')
const field = validation.field

module.exports = [
  field('q'),
  field('page').isPagingOptions(),
  field('filter').isFilter(),
  field('sort').isSort()
]
