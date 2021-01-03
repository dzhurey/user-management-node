const { async } = require("regenerator-runtime");

const JSONResponse = (res, Serializer, data, status) => {
  if (!Serializer) {
    res.status(status).send(data)
    return
  }
  const resData = Serializer.serialize(data)
  res.status(status).send(resData)
}

module.exports = { JSONResponse }