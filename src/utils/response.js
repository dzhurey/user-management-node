const JSONResponse = (res, Serializer, data, status, pagination) => {
  if (!Serializer) {
    res.status(status).send(data)
    return
  }
  const resData = Serializer.serialize(data)
  if (pagination) {
    resData.meta = {
      page: {
        number: pagination.number,
        size: pagination.size,
        pages: pagination.pages,
        total: pagination.total
      }
    }
  }
  res.status(status).send(resData)
}

module.exports = { JSONResponse }