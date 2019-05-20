var express = require('express');
var Task = require('../../dao/TaskCtrl')
var router = express.Router();
var controller = require('../../dao/UserCtrl');
const crypto = require('crypto');
var hash = crypto.createHash('sha256');


router.post('/user',(req,res)=>{
    controller.create()
});
router.post('/login', async(req,res)=>{
    try {
        var user = await controller.getByEmail(req.body.email)
    } catch (error) {
        console.log(error);
    }
    let pass =await hash.update(req.body.password).digest("hex")

    if(user && user.password == pass){
        res.cookie('login', user._id); 
        res.redirect('/');
    }
    else {
        res.status(201).json({ message: 'Usuário ou senha incorretos :(!' });
    }
})
router.get('/user/:id', controller.getById);
router.get('/user', controller.getById);
router.put('/user/:id', controller.updateById)

module.exports = router;