const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    createdAt: { type: String },
    name: { type: String, required: true},
    phone: String,
    email: { type: String, required: true},
    password: { type: String, required: true}
},{
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
});


module.exports = mongoose.model('User', userSchema);