const express = require('express');

const {
  CheckID,
  checkBody,
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourControllere');

const router = express.Router();

router.param('id', CheckID);

router.route('/').get(getAllTours).post(checkBody, createTour);

router.route('/:id').get(getTour).put(checkBody, updateTour).delete(deleteTour);

module.exports = router;
