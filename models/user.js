const mongoose = require('mongoose');
const schema = mongoose.Schema;
const crypto = require('crypto');
const config = require('../config');

const user = new Schema({
    username: String,
    password: String,
    admin: {type: Boolean, default: false}
});

//Create new user document
user.statics.create = function(username, password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                    .update(password)
                    .digest('base64')

    const user = new this ({
        username,
        password: encrypted
    })
    //return the promise
    return user.save()
};

//Find user by using the username
User.statics.findOneByUsername = function(username) {
    return this.findOne({
        username
    }).exec()
};

//Verify the password of the user document
User.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                    .update(password)
                    .digest('base64')
    console.log(this.password === encrypted)
    return this.password === encrypted
};

User.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
};

module.exports = mongoose.model('User', User)