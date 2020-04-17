const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estateSchema = new Schema({
    title: { type: String, required: true},
    description: String,
    city: { type: String, required: true},
    address: { type: String, required: true},
    area: String,
    price: { type: String, required: true},
    rooms: String,
    year: String,
    createdAt: String,
    phone: String,
    owner: { type: String, required: true},
    email: { type: String, required: true},
    file: [{ type: String }]
}, {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
});


module.exports = mongoose.model('Estate', estateSchema);