var express = require('express');
var router = express.Router();
var controller = require('../../dao/TaskCtrl');


router.post('/task', (req, res) => {
    controller.create(req.body, req.cookies.login, (data) => {
        if (data) {
            res.redirect('back');
            return
        }
        res.redirect('/error')

    }
    )
});
router.post('/task/:id', (req, res) => {
    let id = req.params.id,
        listId = req.body.listId;
    console.log(id);

    controller.updateById(id, listId, (data) => {
        if (data) {
            console.log(data)
            res.redirect('back');
            return
        }
        res.redirect('/error')
    }

    )
})
router.get('/task/:id', controller.getById);
router.get('/task', controller.getById);
router.get('/task/list/:id', controller.getByList);

module.exports = router;