var express = require('express');
var router = express.Router();

router.get('/error/user',(req, res) => {
    res.render('error',{message:'Já existe um usuário com este email'})
})
router.get('/error',(req, res) => {
    res.render('error')
})
module.exports = router;