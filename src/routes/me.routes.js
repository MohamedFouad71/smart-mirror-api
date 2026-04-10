const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  me,
  createTrainingSchedule,
  getTrainingSchedule,
  deleteTrainingSchedule,
} = require('../controllers/me.controller');

router.get('/', auth, me);
router
  .route('/schedule')
  .get(auth, getTrainingSchedule)
  .post(auth, createTrainingSchedule)
  .put(auth, createTrainingSchedule)
  .delete(auth, deleteTrainingSchedule);

module.exports = router;
