const modelPanel = require('../model/PanelModel');
const mongoose = require('mongoose')

module.exports = {
    create: function (req, res) {
        var panel = new modelPanel({
            name: req.body.name,
            description: req.body.description,
            userId: req.body.userId,
            creation: req.body.creation,
            removed: false
        });

        panel.save(function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao salvar novo painel', error: err }) };
            return res.json({ panel: data, message: 'Painel criado com sucesso!' });
        });
    },

    getById: function (req, res) {
        var id = req.params.id;
        modelPanel.findOne({ _id: id , removed : false}, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar painel', error: err }) };
            if (data) {
                return res.json({ task: data, message: 'Painel encontrado!' });
            } else {
                return res.status(201).json({ task: data, message: 'Painel não encontrado :(!' });
            }
        });
    },

    deleteById: function (req, res) {
        var id = req.params.id;
        modelPanel.findByIdAndRemove(id, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro deletar painel', error: err }) };
            return res.json({ message: 'Painel excluido com sucesso!' });
        });
    },

    updateById: function (req, res) {
        var id = req.params.id;
        var body = req.body;
        var obj = {
            name: body.name, description: body.description,
            removed: body.removed, creation: body.creation,
            userID: body.userId
        };
        modelPanel.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro deletar painel', error: err }) };
            return res.json({ message: 'Painel atualizado com sucesso!' });
        });
    }
};