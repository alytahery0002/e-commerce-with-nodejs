const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      // required: [true,'لطفا نام خود را وارد کنید']
    },
    // email: {
    //   type: String,
    //   required: [true, 'لطفا ایمیل خود را وارد کنید'],
    //   unique: true,
    //   lowercase: true,
    //   validate: [validator.isEmail, 'Please provide a valid email']
    // },
    phone:{
        type:String,
        required: [true,'لطفا شماره خود را وارد کنید']
    },
    photo: String,
    role: {
      type: String,
      enum: ['user', 'barber', 'admin'],
      default: 'user'
    },

    date_of_birth:{
        type: Date,
        // required: [true, 'لطفا تاریخ تولد خود را وارد کنید'],

    },

    password: {
      type: String,
      required: [true, 'لطفا رمز خود را وارد کنید'],
      minlength: 8,
      select: true
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

      storeId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
  },
    // passwordConfirm: {
    //   type: String,
    //   required: [true, 'Please confirm your password'],
    //   validate: {
    //     // This only works on CREATE and SAVE!!!
    //     validator: function(el) {
    //       return el === this.password;
    //     },
    //     message: 'Passwords are not the same!'
    //   }
    // },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false
    }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;