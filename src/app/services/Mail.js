const nodeMailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')
// const exphbs = require('express-handlebars')
const mailConfig = require('../../config/mail')

const transport = nodeMailer.createTransport(mailConfig)

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: path.resolve(__dirname, '..', 'views', 'emails'),
    layoutsDir: path.resolve(__dirname, '..', 'views', 'emails'),
    defaultLayout: 'purchase.hbs'
  },
  viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
  extName: '.hbs'
}

transport.use('compile', hbs(handlebarOptions))

// transport.use(
//   'compile',
//   hbs({
//     viewEngine: exphbs(),
//     viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
//     partialsDir: path.resolve(__dirname, '..', 'views', 'emails'),
//     extName: '.hbs'
//   })
// )

module.exports = transport
