var express = require('express');
var router = express.Router();
var controller = require('../../dao/ListCtrl');


router.post('/list',(req, res)=>{
    let obj = req.body;
    controller.create(obj).subscribe((data, err)=>{
        if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao salvar nova lista', error: err }) };
        return res.json({ list: data, message: 'Lista criada com sucesso!' });
    })
});
router.get('/list/:id', controller.getById);
router.get('/list', controller.getById);
router.put('/list/:id', controller.updateById)
router.get('/list/panel/:id', controller.getByPanel);

module.exports = router;