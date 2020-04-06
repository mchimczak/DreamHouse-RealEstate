const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estateLikesSchema = new Schema({
    estateId: { type: String, required: true},
    likes: [{ type:String }]
}, {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
});


module.exports = mongoose.model('EstateLikes', estateLikesSchema);