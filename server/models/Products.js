const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    image : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    qty : {
        type : Number,
        required : true
    },
    info : {
        type : String,
        required : true
    },
    created : {
        type : Date,
        default : Date.now()
    }
}, {timestamps: true});
let Product = mongoose.model('products', BookSchema);
module.exports = Product;
