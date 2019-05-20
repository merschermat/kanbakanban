var express = require('express');
var router = express.Router();
var controller = require('../../dao/TaskCtrl');


router.post('/task',(req,res)=>{
    controller.create(req.body, req.cookies.login,  (data)=>{
        if(data){
            res.redirect('back');
            return
        };
        res.status(500).json({ message: 'Ops! Ocorreu um erro ao salvar nova tarefa', error: err })
        res.end();
    }
    
    )});
router.get('/task/:id', controller.getById);
router.get('/task', controller.getById);
router.put('/task/:id', controller.updateById)
router.get('/task/list/:id', controller.getByList);

module.exports = router;