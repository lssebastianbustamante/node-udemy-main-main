/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log(`DB connection successful!!!`);
  } catch (err) {
    console.log(err);
  }
};

connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
