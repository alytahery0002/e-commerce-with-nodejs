const mongoose = require("mongoose");

const AddCartSchema=new mongoose.Schema({
    owner : {
        type: ObjectID,
         required: true,
         ref: 'User'
       },
      items: [{
        itemId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Product',
         required: true
      },
      name: String,
      quantity: {
         type: Number,
         required: true,
         min: 1,
         default: 1},
         price: Number
       }],
      bill: {
          type: Number,
          required: true,
         default: 0
        }
      }, {
      timestamps: true

})

const AddCart = mongoose.model('AddCart', AddCartSchema);

module.exports = AddCart;