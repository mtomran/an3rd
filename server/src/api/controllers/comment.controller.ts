import { type Request, type Response } from 'express'
import Comment from '../../models/Comment'

const addComment = async (req: Request, res: Response): Promise<void> => {
  const { userId, questionId, answerId, body } = req.body
  const comment = await Comment.create({
    user_id: userId,
    question_id: questionId,
    answer_id: answerId,
    body
  })
  res.json({ result: comment })
}

const updateComment = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  const { body } = req.body

  const comment = await Comment.findByPk(id)
  if (comment != null) {
    comment.body = body ?? comment.body
    await comment.save()
  }
  res.json({ result: comment })
}

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id)
  const comment = await Comment.findByPk(id)
  await comment?.destroy()
  res.json({ result: {} })
}

export default {
  addComment,
  updateComment,
  deleteComment
}
