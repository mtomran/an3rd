import { type Request, type Response } from 'express'
import User from '../../models/User'
import Answer from '../../models/Answer'
import Comment from '../../models/Comment'
import Question from '../../models/Question'

const getAllQuestions = async (req: Request, res: Response): Promise<void> => {
  const questions = await Question.findAll({
    include: [{ model: Answer }, { model: User }, { model: Comment }]
  })
  res.json({ result: questions })
}

const getQuestion = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  const question = await Question.findByPk(id, {
    include: [{ model: Answer }, { model: User }, { model: Comment }]
  })
  res.json({ result: question })
}

const addQuestion = async (req: Request, res: Response): Promise<void> => {
  const { userId, title, body, score } = req.body
  const question = await Question.create({
    user_id: userId,
    title,
    body,
    score
  })
  res.json({ result: question })
}

const updateQuestion = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  const { title, body, score } = req.body

  const question = await Question.findByPk(id)
  if (question != null) {
    question.title = title ?? question.title
    question.body = body ?? question.body
    question.score = score ?? question.score
    await question.save()
  }
  res.json({ result: question })
}

const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  const question = await Question.findByPk(id)
  await question?.destroy()
  res.json({ result: {} })
}

export default {
  getAllQuestions,
  getQuestion,
  addQuestion,
  updateQuestion,
  deleteQuestion
}
