import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const DriverSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    driving: {
        type: Boolean,
        default: false
    }

});

export const Driver = mongoose.model('driver', DriverSchema);