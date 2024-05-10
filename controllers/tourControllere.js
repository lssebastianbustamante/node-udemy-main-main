/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-restricted-globals */
const Tour = require('../models/tourModel');

// GET All Tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Bad Request',
    });
  }
};

// GET Tour by ID
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
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
      message: 'Invalid Request',
    });
  }
};

// PUT Update Tour
exports.updateTour = (req, res) => {
  // const id = req.params.id * 1;
  // const params = req.body;
  // const index = tours.findIndex((el) => el.id === id);
  // if (index === -1) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  // }
  // const updatedTour = Object.assign({}, tours[index], params);
  // tours[index] = { ...tours[index], ...params };
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(500).json({
  //       status: 'successs',
  //       data: {
  //         tour: updatedTour,
  //       },
  //     });
  //   },
  // );
};

// DELETE Delete Tour
exports.deleteTour = (req, res) => {
  // const id = req.params.id * 1;
  // const tourExiste = tours.some((x) => x.id === id);
  // const deleteTour = tours.filter((el) => el.id !== id);
  // if (!tourExiste) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Tour Deleted',
  //   });
  // }
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(deleteTour, null, 2),
  //   (err) => {
  //     res.status(204).json({
  //       status: 'success',
  //       data: {
  //         tour: null,
  //       },
  //     });
  //   },
  // );
};
