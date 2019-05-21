const modelUser = require('../model/UserModel');
const mongoose = require('mongoose');

module.exports = {
    create: function (obj, result) {
        var user = new modelUser({
            name: obj.name,
            email: obj.email,
            password: require('crypto').createHash('sha256').update(obj.password).digest("hex"),
            creation: Date.now(),
            removed: false
        });
        user.save(function (err, data) {
            if (err) { result(err) }
            else{result(data) }
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
    getByEmail: function (email) {        
        return new Promise((resolve, reject)=>{
            modelUser.findOne({ email: email , removed : false}, function (err, data) {                
                if (err) { resolve(null) }
                if (data) { resolve(data) }
                resolve(null)
            });
        })
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