import { type Request, type Response } from 'express'
import User from '../../models/User'
import Answer from '../../models/Answer'
import Comment from '../../models/Comment'
import Question from '../../models/Question'

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await User.findAll({
    include: [{ model: Answer }, { model: Question }, { model: Comment }]
  })
  res.json({ result: users })
}

const getUser = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  const user = await User.findByPk(id, {
    include: [{ model: Answer }, { model: Question }, { model: Comment }]
  })
  res.json({ result: user })
}

const addUser = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body
  const user = await User.create({
    username
  })
  res.json({ result: user })
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  const user = await User.findByPk(id)
  await user?.destroy()
  res.json({ result: {} })
}

export default {
  getAllUsers,
  getUser,
  addUser,
  deleteUser
}
