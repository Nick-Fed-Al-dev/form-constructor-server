import * as express from 'express'

import UserValidator from './user.validator'
import UserController from './user.controller'

const router = express.Router()

router.post('/register', UserValidator.validateRegister(), UserController.register)

router.post('/login', UserValidator.validateLogin(), UserController.login)

router.post('/refresh', UserController.refresh)

router.post('/logout', UserController.logout)

export default router