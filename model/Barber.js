const mongoose = require("mongoose");

const BarberSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true,'لطفا نام را وارد کنید']
    },
    location:{
        type:String,
        required: [true,'لطفا موقعیت را وارد کنید']
    },
    reserve:[{
        date:Date,
        time:String,
        barber:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
              },
    }],

    request:[
        {
            store:{
                type: mongoose.Schema.Types.ObjectId,
            ref: 'Store',
            },
            permission:{
                type: String,
                enum: ['accept','faild'],
                default: 'faild'}
          }
        ],

    store:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
    }
    //product
    //addcart
    


})

const Barber = mongoose.model('Barber', BarberSchema);

module.exports = Barber;