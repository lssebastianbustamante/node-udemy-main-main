/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-restricted-globals */
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

// Top Tours
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';

  next();
};

// GET All Tours
exports.getAllTours = async (req, res) => {
  try {
    // Execute Query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// GET Tour by ID
exports.getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Bad Request',
    });
  }
};

// POST Create Tour
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err,
    });
  }
};

// PUT Update Tour
exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const tour = await Tour.findByIdAndUpdate(id, body);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// DELETE Delete Tour
exports.deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await Tour.findByIdAndDelete(id);

    if (tour) {
      res.status(200).json({
        status: 'success',
        message: 'Eminined',
      });
    }
    if (!tour) {
      res.status(400).json({
        status: 'success',
        message: 'Tour Not Find',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Pipeline
 * Nos permite filtrar por rango y agrupar. Permitiendo entre otras operaciones, sacar el promedio
 */

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.7 } },
      },
      {
        $group: {
          _id: '$difficulty',
          numTour: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        // Agrega el field Month
        $addFields: { month: `$_id` },
      },
      {
        // Oculta el _id
        $project: {
          _id: 0,
        },
      },
      {
        /**
         * 1 ordena de menor a mayor
         * -1 ordena de mayor a menor
         */

        $sort: { numTourStarts: -1 },
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        result: plan.length,
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
