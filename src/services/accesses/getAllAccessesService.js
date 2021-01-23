const { Access } = require('../../models')

module.exports = async (params) => {
  console.log(params)
  const result = await Access.paginate({
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