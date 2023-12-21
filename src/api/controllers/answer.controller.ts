import { type Request, type Response } from 'express'
import Answer from '../../models/Answer'

const addAnswer = async (req: Request, res: Response): Promise<void> => {
  const { userId, questionId, body, score, accepted } = req.body
  const answer = await Answer.create({
    user_id: userId,
    question_id: questionId,
    body,
    score,
    accepted
  })
  res.json({ result: answer })
}

const updateAnswer = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  const { body, score, accepted } = req.body

  const answer = await Answer.findByPk(id)
  if (answer != null) {
    answer.body = body ?? answer.body
    answer.score = score ?? answer.score
    answer.accepted = accepted ?? answer.accepted
    await answer.save()
  }
  res.json({ result: answer })
}

const deleteAnswer = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  const answer = await Answer.findByPk(id)
  await answer?.destroy()
  res.json({ result: {} })
}

export default {
  addAnswer,
  updateAnswer,
  deleteAnswer
}
