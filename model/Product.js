const mongoose = require("mongoose");

const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,'لطفا نام را وارد کنید']
    },

    description:{
        type:String,
        required: [true,'لطفا توضیحات را وارد کنید']
    },

    price:{
        type:Number,
        required: [true,'لطفا قیمت را وارد کنید']
    },

    image:{
        type:String,

    },

    // brand:{
        
    // }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;