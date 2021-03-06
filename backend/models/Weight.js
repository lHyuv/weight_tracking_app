const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

let weightSchema = new Schema({
    /*
    name: {
        type: String,
        required: [true, "Name can't be empty."]
    },
    */
    current_weight: {
        type: Number,
        required: [true, "Weight can't be empty."]
    },
    log: {
        type: String,
        default: "N/A"
    },
    status: {
        type: String,
        default: "Active"
    },
    user: {
        type: String,
        ref: 'User',
        required: [true, "User can't be empty."]
    }

},
{
    collection: 'weights',
    timestamps: true,
    createdAt: "date_created",
    updatedAt: "date_updated"

}
);

module.exports = mongoose.model('Weight',weightSchema);