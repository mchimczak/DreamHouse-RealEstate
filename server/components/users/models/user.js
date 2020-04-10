const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    createdAt: { type: String },
    name: { type: String, required: true },
    phone: String,
    email: { type: String, required: true, unique: true, uniqueCaseInsensitive: true},
    password: { type: String, required: true, minlength: 6}
},{
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);