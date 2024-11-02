const mongoose = require("mongoose");

const Product=require("../model/Product")

const StoreSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,'لطفا نام را وارد کنید']
    },
    location:{
        type:String,
        required: [true,'لطفا موقعیت را وارد کنید']
    },

    address:{
        type:String,
        required: [true,'لطفا آدرس را وارد کنید']
    },

    mainBarber:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    request:[
        {
            person:{
                type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            },
            permission:{
                type: String,
                enum: ['accept','faild'],
                default: 'faild'}
          }
        ],
    products:Array,
    
    barber:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          }
        
    ],

    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]      
})



StoreSchema.pre('save', async function(next) {
  const productsPromises = this.products.map(async id => await Product.findById(id));
  this.products = await Promise.all(productsPromises);
  next();
});


const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;