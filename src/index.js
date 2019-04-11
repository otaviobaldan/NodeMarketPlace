const server = require('./server')

server.listen(process.env.PORT || 3000, () => {
  const port = process.env.PORT || 3000
  console.log(`Server started on port ${port}`)
})
