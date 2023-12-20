/**
 * This module loads questions data into the DB
 * Data is stored in a json file called data.json
 */
import { readFile } from "fs/promises";
import User from "./models/User";
import Comment from "./models/Comment";
import Answer from "./models/Answer";
import Question from "./models/Question";

interface UserObject {
    id: Number,
    name: String,
}

interface CommentObject {
    id: number,
    body: string,
    user: UserObject,
}

interface AnswerObject {
    id: number,
    body: string,
    creation: number,
    score: number,
    user: UserObject,
    accepted: Boolean,
    comments: CommentObject[],
}

interface QuestionObject {
    id: number,
    title: string,
    body: string,
    creation: number,
    score: number,
    user: UserObject,
    comments: CommentObject[],
    answers: AnswerObject[],
}

export async function loadData () {
    const fileData = await readFile(__dirname + '/assets/data.json', 'utf8');
    const questions = JSON.parse(fileData);
    const users: Map<Number, String> = new Map();
    const comments: CommentObject[] = [];
    const answers: AnswerObject[] = [];

    // extracting users, comments, and answers
    questions.forEach((question: QuestionObject) => {
        const {id, name} = question.user;
        users.set(id, name);
        question.comments.forEach((comment: CommentObject) => {
            comments.push(comment);
            const { id, name } = comment.user;
            users.set(id, name);
        });
        question.answers.forEach((answer: AnswerObject) => {
            answers.push(answer);
            const { id, name } = answer.user;
            users.set(id, name);
            answer.comments.forEach((comment) => {
                comments.push(comment);
                const { id, name } = comment.user;
                users.set(id, name);
            });
        });
    });

    // inserting users to the DB
    [ ...users.keys() ].forEach(async (id) => {
        await User.findOrCreate({
            where: { id },
            defaults: { id, username: users.get(id) }
        });
    });

    // inserting comments to the DB
    comments.forEach(async (comment) => {
        const { id, body , user } = comment;
        await Comment.create({ id, body, user_id: user.id });
    });

    // inserting answers to the DB
    answers.forEach(async (answer) => {
        const { id, body, creation, score, accepted } = answer;
        const createdAnswer = await Answer.create({
                id,
                body,
                createdAt: new Date(creation * 1000),
                score,
                accepted,
                user_id: answer.user.id,
            }
        ); 

        // setting relation for comments on answers
        await createdAnswer.$set("Comments", answer.comments.map(i => i.id));
    });

    // inserting questions to the DB
    questions.forEach(async (question: QuestionObject) => {
        const {id, title, body, creation, score, user } = question;
        const createdQuestion = await Question.create({
            id,
            title,
            body,
            createdAt: creation,
            score,
            user_id: user.id
        });

        // setting relation for comments on questions
        await createdQuestion.$set("Comments", question.comments.map(i => i.id));

        // setting relation for answers of a question
        await createdQuestion.$set("Answers", question.answers.map(i => i.id));
    })
} 