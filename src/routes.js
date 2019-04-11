const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/session',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)
routes.get('/ping', authMiddleware, (req, res) => {
  res.status(200).json({ ok: true })
})

// todas as rotas daqui para baixo irão usar o middleware
routes.use(authMiddleware)

// Ads
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

// Send Mail
routes.post(
  '/purchase',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

routes.post('/purchase/accept/:id', handle(controllers.AcceptController.store))
module.exports = routes
