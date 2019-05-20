const modelTask = require('../model/TaskModel');
const mongoose = require('mongoose')

module.exports = {
    create: function (obj, userId,result) {
        var task = new modelTask({
            listId: obj.listId,
            name: obj.name,
            description: obj.description,
            userId: userId,
            creation: Date.now(),
            removed: false
        });

        task.save(function (err, data) {
            if (err) { result(err) }
            else{result(data) }
        });
    },

    getByUser: function (userId) {
        return new Promise(async (resolve, reject) => {
            modelTask.find({ userId : userId, removed: false }, function (err, data) {
                if (err) { resolve(null) }
                if (data) { resolve(data) }
            });
        })
    },

    getById: function (req, res) {
        var id = req.params.id;
        modelTask.findOne({ _id: id, removed: false }, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar tarefa', error: err }) };
            if (data) {
                return res.json({ task: data, message: 'Tarefa encontrada!' });
            } else {
                return res.status(201).json({ task: data, message: 'Tarefa não encontrada :(!' });
            }
        });
    },

    getByList: function (listId) {
        return new Promise(async (resolve, reject) => {
            modelTask.find({ listId : listId, removed: false }, function (err, data) {
                if (err) { resolve(null) }
                if (data) { resolve(data) }
                resolve(null)
            });
        })
    },

    deleteById: function (req, res) {
        var id = req.params.id;
        modelTask.findByIdAndRemove(id, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro deletar tarefa', error: err }) };
            return res.json({ message: 'Tarefa excluida com sucesso!' });
        });
    },

    updateById: function (req, res) {
        var id = req.params.id;
        var body = req.body;
        var obj = {
            name: body.name, description: body.description,
            removed: body.removed, creation: body.creation,
            userID: body.userId, listId: body.listId
        };
        modelTask.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro atualizar tarefa', error: err }) };
            return res.json({ message: 'Tarefa atualizada com sucesso!' });
        });
    }
};