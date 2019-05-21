const modelList = require('../model/ListModel');
const mongoose = require('mongoose')

module.exports = {
    create: function (obj, userId, result) {
        console.log(userId);
        
        var list = new modelList({
            name: obj.name,
            description: obj.description,
            userId: userId,
            creation: Date.now(),
            removed: false
        });

        list.save(function (err, data) {
            if (err) { result(err) }
            else{result(data) }
        });
    },
    getByUser: function (userId) {
        return new Promise(async (resolve, reject) => {
            modelList.find({ userId: userId, removed: false }, function (err, data) {
                if (err) { resolve(null) }
                if (data) { resolve(data) }
                resolve(null)
            });
        })
    },
    getById: function (req, res) {
        var id = req.params.id;
        modelList.findOne({ _id: id, removed: false }, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar lista', error: err }) };
            if (data) {
                return res.json({ task: data, message: 'Lista encontrada!' });
            } else {
                return res.status(201).json({ task: data, message: 'Lista não encontrada :(!' });
            }
        });
    },

    deleteById: function (req, res) {
        var id = req.params.id;
        modelList.findByIdAndRemove(id, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro deletar lista', error: err }) };
            return res.json({ message: 'Lista excluida com sucesso!' });
        });
    },

    updateById: function (req, res) {
        var id = req.params.id;
        var body = req.body;
        var obj = {
            name: body.name, description: body.description,
            removed: body.removed, creation: body.creation,
        };
        modelList.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro atualizar lista', error: err }) };
            return res.json({ message: 'Lista atualizada com sucesso!' });
        });
    }
};