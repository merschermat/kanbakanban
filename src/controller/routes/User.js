var express = require('express');
var Task = require('../../dao/TaskCtrl')
var router = express.Router();
var controller = require('../../dao/UserCtrl');


router.post('/user', async (req, res) => {
        controller.create(req.body, (data) => {
            if (data) {
                res.cookie('login', data._id);
                res.redirect('/');
                return
            }
            else {
                res.redirect('/error')
            }
        })
});
router.get('/logout', (req, res) => {
    res.clearCookie('login');
    res.redirect('/login');
    return
})
router.post('/login', async (req, res) => {
    try {
        var user = await controller.getByEmail(req.body.email)
        var pass = await require('crypto').createHash('sha256').update(req.body.password).digest("hex")

    } catch (error) {
        console.log(error);
    }

    if (user && user.password == pass) {
        res.cookie('login', user._id);
        res.redirect('/');
    }
    else {
        res.render('signup', { messageLogin: 'Usuário ou senha incorretos :(!' });
    }
})
router.get('/user/:id', controller.getById);
router.get('/user', controller.getById);
router.put('/user/:id', controller.updateById)

module.exports = router;