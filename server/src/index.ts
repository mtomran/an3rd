import { startApp } from './api/app'
import sequelize, { testConnection } from './sequelize'
import { loadData } from './loadData'
import User from './models/User'
import Comment from './models/Comment'
import Answer from './models/Answer'
import Question from './models/Question'

async function start (): Promise<void> {
  // testing database connection
  await testConnection()

  // letting Sequelize know about the models
  sequelize.addModels([User, Comment, Answer, Question])

  // force sync the database with the model
  // Note: this is for development only as it will drop existing tables if needed
  //  For proper environment, proper migration mechanism is recommended
  await sequelize.sync({ force: true })

  // initialize the database using the json file provided
  await loadData()

  // start the server
  await startApp()
}

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p)
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown')
    process.exit(1)
  })

void start()
