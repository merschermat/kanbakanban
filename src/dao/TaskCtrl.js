const modelTask = require('../model/TaskModel');
const mongoose = require('mongoose')

module.exports = {
    create: function (req, res) {
        var task = new modelTask({
            listID: req.body.listID,
            name: req.body.name,
            description: req.body.description,
            userId: req.body.userId,
            creation: req.body.creation,
            removed: false
        });

        task.save(function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao salvar nova tarefa', error: err }) };
            return res.json({ task: data, message: 'Tarefa criada com sucesso!' });
        });
    },

    getById: function (req, res) {
        var id = req.params.id;
        modelTask.findOne({ _id: id , removed : false}, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar tarefa', error: err }) };
            if (data) {
                return res.json({ task: data, message: 'Tarefa encontrada!' });
            } else {
                return res.status(201).json({ task: data, message: 'Tarefa não encontrada :(!' });
            }
        });
    },

    getByList: function (req, res) {
        var listId = req.params.id;
        modelTask.find({ listID : listId , removed : false}, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar tarefas', error: err }) };
            if (data) {
                return res.json({ data });
            } else {
                return res.status(201).json({ message: 'Tarefas não encontradas :(!' });
            }
        });
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