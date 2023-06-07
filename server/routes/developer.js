const developers = require('../services/developers')
const router = require('express').Router();

router.get('/:devId', developers.get_developer_games);
router.get('/trans/:devId', developers.getWithdrawals);
router.get('/adUnits/:devId', developers.getadUnits);
// router.get('/withdrawals', developers.getWithdrawals("JIc4tQQDxDSH9TYIHD8C"));


module.exports = router;