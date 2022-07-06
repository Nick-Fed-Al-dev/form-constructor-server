import * as express from "express"

import userRouter from "./user/user.router"
import formRouter from "./form/form.router"
import noteRouter from "./note/note.router"

const router = express.Router()

router.use('/user', userRouter)
router.use('/form', formRouter)
router.use('/note', noteRouter)

export default router