import app, {startApp} from "./api/app"
import sequelize, {testConnection} from "./sequelize";
import { loadData } from "./loadData";
import User from './models/User';
import Comment from "./models/Comment";
import Answer from "./models/Answer";
import Question from "./models/Question";

async function start () {
  await testConnection();
  sequelize.addModels([User, Comment, Answer, Question]);
  await sequelize.sync({ force: true });
  await loadData(); 
  startApp();
}

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p)
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown')
    process.exit(1)
  })

start() 