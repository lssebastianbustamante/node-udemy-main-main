const express = require('express');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourControllere');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).put(updateTour).delete(deleteTour);

module.exports = router;
