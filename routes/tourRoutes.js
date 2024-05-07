const express = require('express');

const {
  CheckID,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourControllere');

const router = express.Router();

router.param('id', CheckID);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).put(updateTour).delete(deleteTour);

module.exports = router;
