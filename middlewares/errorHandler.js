// Express errorHandler
module.exports = (err, req, res, next) => {
  console.log(`Error: code => ${err.errorCode} message => ${err.message}`.red)
  res.status(err.errorCode || 500).json({ error: true, message: err.message })
}
