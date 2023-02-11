const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.product = require("./product.model.js");
db.user = require("./user.model.js");


module.exports = db;