const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()

app.use(bodyParser.json())
app.use(require('./components/authorization'))
app.use(helmet())

// Trailing slash redirection
app.use((req, res, next) => {
  const test = /\?[^]*\//.test(req.url)
  if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
    res.redirect(301, req.url.slice(0, -1))
  else
    next();
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})

module.exports = app
