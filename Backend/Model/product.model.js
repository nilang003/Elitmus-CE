// Add Product Model With Schema
// 1. Product Name
// 2. Product Image
// 3. Description
// 4. Quantity
// 5. Unit Price

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    image: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Number,
    },
});

module.exports = mongoose.model('Product', productSchema);
