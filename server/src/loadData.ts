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
  answerId: number
  questionId: number
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

  // list of all questions
  const questions = JSON.parse(fileData)

  // list of users are collected from questions, answers, and comment.
  // key-value map is used to get distinct users at the end.
  const users = new Map<number, string>()

  // list of all comments
  const comments: CommentObject[] = []

  // list of all answers
  const answers: AnswerObject[] = []

  // extracting users, comments, and answers
  questions.forEach((question: QuestionObject) => {
    // extract users from questions
    const { id, name } = question.user
    users.set(id, name)

    // extracting comments on questions
    question.comments.forEach((comment: CommentObject) => {
      // setting which question this comment belongs to for setting the relation later
      comment.questionId = question.id
      comments.push(comment)

      // extracting users from comments on questions
      const { id, name } = comment.user
      users.set(id, name)
    })

    // extracting answers to questions
    question.answers.forEach((answer: AnswerObject) => {
      // setting what question this answer belongs to for setting the relation later
      answer.questionId = question.id

      answers.push(answer)

      // extracting users from answers
      const { id, name } = answer.user
      users.set(id, name)

      // extracting comments form answers
      answer.comments.forEach((comment) => {
        // setting which answer this question belongs to for setting the relation later
        comment.answerId = answer.id
        comments.push(comment)

        // extracting users from comments on answers
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

  // inserting questions to the DB
  questions.forEach(async (question: QuestionObject) => {
    const { id, title, body, creation, score, user } = question
    await Question.create({
      id,
      title,
      body,
      createdAt: creation,
      score,
      user_id: user.id
    })
  })

  // inserting answers to the DB
  for (const answer of answers) {
    const { id, body, creation, score, accepted, questionId } = answer
    await Answer.create({
      id,
      body,
      createdAt: new Date(creation * 1000),
      score,
      accepted,
      user_id: answer.user.id,
      question_id: questionId
    })
  }

  // inserting comments to the DB
  for (const comment of comments) {
    const { id, body, user, answerId, questionId } = comment
    await Comment.create({
      id,
      body,
      user_id: user.id,
      question_id: questionId,
      answer_is: answerId
    })
  }
}
