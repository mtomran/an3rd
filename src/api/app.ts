import express, { NextFunction, Request, Response } from 'express'
import userRoutes from './routes/user.route'
import questionRoutes from './routes/question.route'
import answerRoutes from './routes/answer.route'
import commentRoutes from './routes/comment.route'
import errorHandler from './middlewares/errorHandler'

const app = express();

const port = process.env.PORT || 3000;

export async function startApp() {
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to an3rd API!');
  });

  app.use('/user', userRoutes)
  app.use('/question', questionRoutes)
  app.use('/answer', answerRoutes)
  app.use('/comment', commentRoutes)


  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
