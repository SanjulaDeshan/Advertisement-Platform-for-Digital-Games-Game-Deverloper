const games = require('../services/games');
const { addGame, deleteGame, addAdUnit, delete_ad_unit } = require('../services/new');
const router = require('express').Router();
const get_revenue = require("../services/revenue.js")

router.get('/', games.loadGames);
router.put('/:devId', games.addGame);
router.delete('/:devId/:gameId', games.deleteGames);

router.post("/revenue", get_revenue);

router.post("/addGame", addGame)
router.delete("/deleteGame", deleteGame)

// addAdUnit, delete_ad_unit
router.post("/addAdUnit", addAdUnit)
router.delete("/deleteAdUnit", delete_ad_unit)

module.exports = router;