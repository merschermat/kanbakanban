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
    getByEmail: function (email) {        
        return new Promise((resolve, reject)=>{
            modelUser.findOne({ email: email , removed : false}, function (err, data) {                
                if (err) { resolve(null) }
                if (data) { resolve(data) }
                resolve(null)
            });
        })
    },
};