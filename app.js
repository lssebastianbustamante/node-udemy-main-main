const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// GET All Tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

// GET Tour by ID
const getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (isNaN(id)) {
    return res.status(404).json({
      status: 'invalid',
      message: 'Id is not number'
    })
  }
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
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign(
    { id: newId, cratedTime: req.requestTime },
    req.body
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
    }
  );
};

// PUT Update Tour
const updateTour = (req, res) => {
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
    }
  );
};

// DELETE Delete Tour
const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tourExiste = tours.some((x) => x.id == id);
  const deleteTour = tours.filter((el) => el.id !== id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Ivalid ID',
    });
  }

  if (!tourExiste) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour Deleted',
    });
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(deleteTour, null, 2),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: {
          tour: null,
        },
      });
    }
  );
};

// Route

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app.route('/api/v1/tours/:id').get(getTour).put(updateTour).delete(deleteTour);

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
