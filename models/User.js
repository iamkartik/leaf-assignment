const mongoose = require('mongoose');

//Only using google auth for now but can use other social logins as well in same schema
const userSchema = new mongoose.Schema({
    gid:'String',
    name:'String',
    picture:'String',
    apiKey:'String',
    accessToken:'String',
    refreshToken:'String'
});

const User = mongoose.model('User',userSchema);

module.exports = User;  