const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://mudit108dayma:12345@cluster0.z0mcnkz.mongodb.net/liberary");

const db = mongoose.connection;

db.on('connected', (err) => {
    if (err) {
        console.log("Database not connected");
        return false;
    }
    console.log("database connected..");
})

module.exports = db;
