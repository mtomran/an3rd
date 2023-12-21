import { type RequestHandler, Router } from 'express'
import commentController from '../controllers/comment.controller'

const router = Router()

router.post('/', commentController.addComment as RequestHandler)
router.put('/:id', commentController.updateComment as RequestHandler)
router.delete('/:id', commentController.deleteComment as RequestHandler)

export default router
