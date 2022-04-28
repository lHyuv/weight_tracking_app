const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

let userSchema = new Schema({

    user_name: {
        type: String,
        required: [true, "Username can't be empty."],
        unique: true
       // unique: [true, "Username should be unique"]
    },

    status: {
        type: String,
        default: "Active"
    }

},
{
    collection: 'users',
    timestamps: true,
    createdAt: "date_created",
    updatedAt: "date_updated"

}
);

module.exports = mongoose.model('User',userSchema);