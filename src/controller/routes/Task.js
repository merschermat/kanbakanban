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

    controller.updateById(id, listId, (data) => {
        if (data) {
            res.redirect('back');
            return
        }
        res.redirect('/error')
    }

    )
})
module.exports = router;