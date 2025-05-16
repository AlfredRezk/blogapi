// Express errorHandler
module.exports = (err, req, res, next) => {
  // Mongoose bad ObjectId => CastError

  if (err.name === 'CastError')
    err.message = `Resource not found with id of ${err.value}`

  // Mongooe ValidationError
  if (err.name === 'ValidationError') {
    err.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
  }

  console.log(`Error: code => ${err.errorCode} message => ${err.message}`.red)
  res.status(err.errorCode || 500).json({ error: true, message: err.message })
}
