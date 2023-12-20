import { Sequelize } from 'sequelize-typescript';
import dotenv from "dotenv";

dotenv.config()

// Database connection details
const host = process.env.DB_HOST;
const database = process.env.DB_NAME || "";
const username = process.env.DB_USERNAME || "";
const password = process.env.DB_PASSWORD || "";

// Create a new Sequelize instance
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  define: {
    freezeTableName: true,
    underscored: true
  },
  logging: console.log, // Enable logging; using console.log here
});

// Testing the connection
export async function testConnection() {
  console.log("testing connection..")
  try {
    await sequelize.authenticate();
    console.log('DB connection has been established.');
  } catch (error) {
    console.error('Unable to connect to the DB:', error);
  }
}

export default sequelize;

