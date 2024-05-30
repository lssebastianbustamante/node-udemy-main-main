/* eslint-disable node/no-unsupported-features/es-syntax */
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const queriesObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queriesObj[el]);

    let queryStr = JSON.stringify(queriesObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`,
    );

    let queries = User.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      queries = queries.sort(sortBy);
    } else {
      queries = queries.sort('-createAt');
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      queries = queries.select(fields);
    } else {
      queries = queries.select('-__v');
    }

    const users = await queries;

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({
        status: 'success',
        message: `User Elimined`,
      });
    }

    if (!user) {
      res.status(202).json({
        status: 'fail',
        message: `User dont find`,
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
