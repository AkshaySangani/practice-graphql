let mongoose = require('mongoose');

let StudetSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
});

module.exports = mongoose.model('StudetSchema', StudetSchema);
