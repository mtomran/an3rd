import app from "./api"
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

}

start()