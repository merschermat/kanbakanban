const modelUser = require('../model/UserModel');
const mongoose = require('mongoose');
const crypto = require('crypto');
var hash = crypto.createHash('sha256');

module.exports = {
    create: function (req, res) {
        var user = new modelUser({
            name: req.body.name,
            email: req.body.email,
            password: hash.update(req.body.password).digest("hex"),
            creation: req.body.creation,
            removed: false
        });

        user.save(function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao salvar novo usuário', error: err }) };
            return res.json({ user: data, message: 'Usuario criada com sucesso!' });
        });
    },
    resetPassword: function(re, res){
        var id = req.params.id;
        modelUser.findByIdAndUpdate(id, {password :  hash.update(req.body.password).digest("hex")}, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro atualizar senha', error: err }) };
            return res.json({ message: 'Senha atualizado com sucesso!' });
        });
    },

    getById: function (req, res) {
        var id = req.params.id;
        modelUser.findOne({ _id: id , removed : false}, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro ao buscar usuário', error: err }) };
            if (data) {
                return res.json({ user: data, message: 'Usuário encontrado!' });
            } else {
                return res.status(201).json({ user: data, message: 'Usuário não encontrado :(!' });
            }
        });
    },

    deleteById: function (req, res) {
        var id = req.params.id;
        modelUser.findByIdAndRemove(id, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro deletar usuário', error: err }) };
            return res.json({ message: 'Usuário excluido com sucesso!' });
        });
    },

    updateById: function (req, res) {
        var id = req.params.id;
        modelUser.findByIdAndUpdate(id, {name : body.req.name}, function (err, data) {
            if (err) { return res.status(500).json({ message: 'Ops! Ocorreu um erro atualizar usuário', error: err }) };
            return res.json({ message: 'Usuario atualizado com sucesso!' });
        });
    }
};