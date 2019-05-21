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

    getByList: function (listId) {
        return new Promise(async (resolve, reject) => {
            modelTask.find({ listId : listId, removed: false }, function (err, data) {
                if (err) { resolve(null) }
                if (data) { resolve(data) }
                resolve(null)
            });
        })
    },


    updateById: function (id, listId, result) {
        modelTask.findOneAndUpdate({_id : id}, {$set:{listId : listId}}, function (err, data) {
                if (err) { result(err) }
                else{result(data) }
        })
    }
};