var express = require('express');
var router = express.Router();
var controller = require('../../dao/PanelCtrl');


router.post('/panel', controller.create);
router.get('/panel/:id', controller.getById);
router.get('/panel', controller.getById);
router.put('/panel/:id', controller.updateById)

module.exports = router;