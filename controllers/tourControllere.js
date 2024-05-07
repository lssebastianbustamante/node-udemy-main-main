/* eslint-disable no-unused-vars */
/* eslint-disable prefer-object-spread */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-restricted-globals */
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

// CheckID
exports.CheckID = (req, res, next, val) => {
  console.log(`ID: ${val}`);

  const id = val;
  if (isNaN(id)) {
    return res.status(404).json({
      status: 'invalid',
      message: 'Id is not number',
    });
  }

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Ivalid ID',
    });
  }

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

// CheckBody
exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || name === '') {
    return res.status(404).json({
      status: 'Fail',
      message: 'Missing Name',
    });
  }

  if (!price || isNaN(price)) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Missing Price',
    });
  }
  next();
};

// GET All Tours
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

// GET Tour by ID
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Ivalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// POST Create Tour
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign(
    { id: newId, cratedTime: req.requestTime },
    req.body,
  );

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'successs',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

// PUT Update Tour
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const params = req.body;
  const index = tours.findIndex((el) => el.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedTour = Object.assign({}, tours[index], params);

  tours[index] = { ...tours[index], ...params };

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(500).json({
        status: 'successs',
        data: {
          tour: updatedTour,
        },
      });
    },
  );
};

// DELETE Delete Tour
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tourExiste = tours.some((x) => x.id === id);
  const deleteTour = tours.filter((el) => el.id !== id);

  if (!tourExiste) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour Deleted',
    });
  }

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(deleteTour, null, 2),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: {
          tour: null,
        },
      });
    },
  );
};
