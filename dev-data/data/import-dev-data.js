const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

console.log(DB);

const connectDB = async () => {
  try {
    await mongoose.connect(DB);
  } catch (error) {
    console.log(error);
  }
};

connectDB();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importTourData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteTourData = async () => {
  try {
    console.log('Data successful deleted!!!');
    await Tour.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importUsersData = async () => {
  try {
    await User.create(users);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteUsersData = async () => {
  try {
    await User.deleteMany();
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--users' && process.argv[3] === '--import') {
  importUsersData();
  console.log('Populate Users');
}

if (process.argv[2] === '--users' && process.argv[3] === '--delete') {
  deleteUsersData();
  console.log('Delete Users');
}

if (process.argv[2] === '--tours' && process.argv[3] === '--import') {
  importTourData();
  console.log('Populate Tours');
}

if (process.argv[2] === '--tours' && process.argv[3] === '--delete') {
  deleteTourData();
  console.log('Delete Tours');
}
