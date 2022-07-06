import * as express from 'express'

import FormController from './form.controller'
import FormValidator from './form.validator'
import authMiddleware from '../../middleware/auth.middleware'

const router = express.Router()

router.use(authMiddleware)

router.get('/', FormController.getForms)

router.get('/:id', FormValidator.validateParamId(), FormController.getForm)

router.post('/', FormValidator.validateForm(), FormController.createForm)

router.put('/:id', [
  ...FormValidator.validateForm(),
  ...FormValidator.validateParamId()
], FormController.updateForm)

router.delete('/:id', FormValidator.validateParamId(), FormController.removeForm)

export default router