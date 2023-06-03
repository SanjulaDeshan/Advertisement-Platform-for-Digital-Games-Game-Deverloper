const games = require('../services/games')
const router = require('express').Router();
const get_revenue = require("../services/revenue.js")

router.get('/', games.loadGames);
router.put('/:devId', games.addGame);
router.delete('/:devId/:gameId', games.deleteGames);

router.post("/revenue", get_revenue);

module.exports = router;