import { Router, type RequestHandler } from 'express'
import userController from '../controllers/user.controller'

const router = Router()

router.get('/', userController.getAllUsers as RequestHandler)
router.get('/:id', userController.getUser as RequestHandler)
router.post('/', userController.addUser as RequestHandler)
router.delete('/:id', userController.deleteUser as RequestHandler)

export default router
