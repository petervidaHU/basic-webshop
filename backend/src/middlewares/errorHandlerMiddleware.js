const error404 = (req, res, next) => {
  const error = new Error(`Sorry, Not Found ..404..`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message ? err.message : err,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { error404, errorHandler }