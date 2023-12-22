/**
 * This module loads questions data into the DB
 * Data is stored in a json file called data.json
 */
import { readFile } from 'fs/promises'
import path from 'node:path'
import User from './models/User'
import Comment from './models/Comment'
import Answer from './models/Answer'
import Question from './models/Question'

interface UserObject {
  id: number
  name: string
}

interface CommentObject {
  id: number
  body: string
  user: UserObject
}

interface AnswerObject {
  id: number
  body: string
  creation: number
  score: number
  user: UserObject
  accepted: boolean
  comments: CommentObject[]
  questionId: number
}

interface QuestionObject {
  id: number
  title: string
  body: string
  creation: number
  score: number
  user: UserObject
  comments: CommentObject[]
  answers: AnswerObject[]
}

export async function loadData (): Promise<void> {
  const fileData = await readFile(path.join(__dirname, '/assets/data.json'), 'utf8')
  const questions = JSON.parse(fileData)
  const users = new Map<number, string>()
  const comments: CommentObject[] = []
  const answers: AnswerObject[] = []

  // extracting users, comments, and answers
  questions.forEach((question: QuestionObject) => {
    const { id, name } = question.user
    users.set(id, name)
    question.comments.forEach((comment: CommentObject) => {
      comments.push(comment)
      const { id, name } = comment.user
      users.set(id, name)
    })
    question.answers.forEach((answer: AnswerObject) => {
      // setting what question this answer belongs to for setting the relation later
      answer.questionId = question.id

      answers.push(answer)
      const { id, name } = answer.user
      users.set(id, name)
      answer.comments.forEach((comment) => {
        comments.push(comment)
        const { id, name } = comment.user
        users.set(id, name)
      })
    })
  })

  // inserting users to the DB
  for (const id of [...users.keys()]) {
    await User.findOrCreate({
      where: { id },
      defaults: { id, username: users.get(id) }
    })
  }

  // inserting comments to the DB
  for (const comment of comments) {
    const { id, body, user } = comment
    await Comment.create({ id, body, user_id: user.id })
  }

  // inserting questions to the DB
  questions.forEach(async (question: QuestionObject) => {
    const { id, title, body, creation, score, user } = question
    const createdQuestion = await Question.create({
      id,
      title,
      body,
      createdAt: creation,
      score,
      user_id: user.id
    })

    // setting relation for comments on questions
    await createdQuestion.$set('Comments', question.comments.map(i => i.id))
  })

  // inserting answers to the DB
  for (const answer of answers) {
    const { id, body, creation, score, accepted, questionId } = answer
    const createdAnswer = await Answer.create({
      id,
      body,
      createdAt: new Date(creation * 1000),
      score,
      accepted,
      user_id: answer.user.id,
      question_id: questionId
    })

    // setting relation for comments on answers
    await createdAnswer.$set('Comments', answer.comments.map(i => i.id))
  }
}
