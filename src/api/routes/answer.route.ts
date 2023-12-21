import { type RequestHandler, Router } from 'express'
import answerController from '../controllers/answer.controller'

const router = Router()

router.post('/', answerController.addAnswer as RequestHandler)
router.put('/:id', answerController.updateAnswer as RequestHandler)
router.delete('/:id', answerController.deleteAnswer as RequestHandler)

export default router
