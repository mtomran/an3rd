import { type RequestHandler, Router } from 'express'
import questionController from '../controllers/question.controller'

const router = Router()

router.get('/', questionController.getAllQuestions as RequestHandler)
router.get('/:id', questionController.getQuestion as RequestHandler)
router.post('/', questionController.addQuestion as RequestHandler)
router.put('/:id', questionController.updateQuestion as RequestHandler)
router.delete('/:id', questionController.deleteQuestion as RequestHandler)

export default router
