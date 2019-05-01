const modelList = require('../model/ListModel');
const mongoose = require('mongoose')

module.exports = {
    create: function (obj) {
        var list = new modelList({
            panelID: obj.panelID,
            name: obj.name,
            description: obj.description,
            userId: obj.userId,
            creation: obj.creation,
            removed: false
        });

        list.save(function (err, data) {
            if(data){
                return data
            }else{
                return err
            }
        });
    },

    getById: function (req, res) {
        var id = req.params.id;
        modelList.findOne({ _id: id , removed : false}, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar lista', error: err }) };
            if (data) {
                return res.json({ task: data, message: 'Lista encontrada!' });
            } else {
                return res.status(201).json({ task: data, message: 'Lista não encontrada :(!' });
            }
        });
    },

    getByPanel: function (req, res) {
        var panelId = req.params.id;
        modelList.find({ panelID : panelId , removed : false}, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar listas', error: err }) };
            if (data) {
                return res.json({ data });
            } else {
                return res.status(201).json({ message: 'Listas não encontradas :(!' });
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
            userID: body.userId, panelId: body.panelId
        };
        modelList.findByIdAndUpdate(id, obj, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro atualizar lista', error: err }) };
            return res.json({ message: 'Lista atualizada com sucesso!' });
        });
    }
};