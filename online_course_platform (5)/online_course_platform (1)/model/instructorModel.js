const mongoose = require('mongoose');

const validator = require('validator');
const instructorSchema = new mongoose.Schema(
    {
        firstName: {
            type:String,
            required:[true,'First name is required'],
            minlength: [3,'first name must contain at least 3 chars'],
            maxlength: [12,'first name must not exceed 12 chars'],
            validate:{
                validator:(val) =>{
                    const isArabic = validator.isAlpha(val,'ar-AE',{ignore:" "});
                    const isEnglish = validator.isAlpha(val,'en-US',{ignore:" "});
                    return isArabic || isEnglish;

                },
                message:"first name must contain only arabic or english letters",

            },
        },
        lastName:{
              type:String,
            required:[true,'First name is required'],
            minlength: [3,'first name must contain at least 3 chars'],
            maxlength: [12,'first name must not exceed 12 chars'],
            validate:{
                validator:(val) =>{
                    const isArabic = validator.isAlpha(val,'ar-AE',{ignore:" "});
                    const isEnglish = validator.isAlpha(val,'en-US',{ignore:" "});
                    return isArabic || isEnglish;

                },
                message:"first name must contain only arabic or english letters",

        
        },
    },
    email:{
        type:String,
        required: [true,'user must have an email'],
        unique: true,
        validate:[validator.isEmail,"invalid email"],
    },
    username:{
        type:String,
        required:[true,'user must have a username'],
        unique: true,
    },
    password:{
        type:String,
        required: [true,'user must have a strong password'],
        validate: [
            validator.isStrongPassword,
            'password must be at least 8 characters and include uppercase,lowercase,numbers and symbols',

        ],


    },
    phone: {
      type: String,
      required: [true, "User must have a number"],
      unique: true,
      validate: {
        validator: function (value) {
          return RegExp(/^01[0-2,5]{1}[0-9]{8}$/gm).test(value);
        },
        message: "invalid number ",
      },
    },
    age: {
      type: Number,
      min: [15, "user must be at least 15 years old"],
      max: [100, "user must be at most 100 years old"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Gender must be male or female",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

instructorSchema.virtual('fullname').get(function(){
    return `${this.firstName} ${this.lastName}`;
});

const instructor = new mongoose.model('instructor',instructorSchema);
module.exports = instructor;

   

