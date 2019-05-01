var express = require('express');
var router = express.Router();
var controller = require('../../dao/TaskCtrl');


router.post('/task', controller.create);
router.get('/task/:id', controller.getById);
router.get('/task', controller.getById);
router.put('/task/:id', controller.updateById)
router.get('/task/list/:id', controller.getByList);

module.exports = router;