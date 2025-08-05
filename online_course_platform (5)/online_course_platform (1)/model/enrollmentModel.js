const mongoose=require('mongoose')

const validator=require('validator')

const enrollmentSchema = new mongoose.Schema({



    enrollment_id:{
        type: String,
        required: [true, "Please provide enrollment ID"],
        unique: true,
        trim: true,
        validate: {
            validator: (val) => validator.isAlphanumeric(val),
            message: "Enrollment ID must be alphanumeric",
        },
    },

    enrollment_time:{
        type: Date,
        default: Date.now,
        required: [true, "Please provide enrollment time"],
        },

        status:{
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
            required: [true, "Please provide enrollment status"],
        },
        studentId:{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        }




});

module.exports = mongoose.model('Enrollment', enrollmentSchema);