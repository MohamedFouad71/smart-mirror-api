const router = require('express').Router();
const { aiGenerationLimiter } = require('../middleware/rateLimit');

const auth = require('../middleware/auth');
const meController = require('../controllers/me.controller');

router.get('/', auth, meController.me);

router
  .route('/schedule')
  .get(auth, meController.getTrainingSchedule)
  .post(auth, aiGenerationLimiter, meController.createTrainingSchedule)
  .put(auth, aiGenerationLimiter, meController.createTrainingSchedule)
  .delete(auth, meController.deleteTrainingSchedule);

router
  .route('/diet')
  .get(auth, meController.getDiet)
  .post(auth, aiGenerationLimiter, meController.createDiet)
  .put(auth, aiGenerationLimiter, meController.createDiet)
  .delete(auth, meController.deleteDiet);

module.exports = router;
