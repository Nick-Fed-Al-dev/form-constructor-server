import * as express from 'express'

import NoteValidator from './note.validator'
import NoteController from './note.controller'
import authMiddleware from '../../middleware/auth.middleware'

const router = express.Router()

router.use(authMiddleware)

router.get('/', NoteController.getNotes)

router.get('/:id', NoteValidator.validateParamId(), NoteController.getNote)

router.post('/', NoteValidator.validateNote(), NoteController.createNote)

export default router