var express = require('express');
var router = express.Router();
var controller = require('../../dao/ListCtrl');


router.post('/list', (req, res) => {
    let obj = req.body;
    let list = controller.create(obj, req.cookies.login, (data)=>{
        if (data) {
            res.redirect('back');
            return
        };
        res.status(500).json({ message: 'Ops! Ocorreu um erro ao salvar nova tarefa', error: err })
        res.end();
    })});
router.get('/list/:id', controller.getById);
router.get('/list', controller.getById);
router.put('/list/:id', controller.updateById)
router.get('/list/panel/:id', controller.getByPanel);

module.exports = router;