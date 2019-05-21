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
};