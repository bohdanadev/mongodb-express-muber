import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PointSchema = new Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
}, {_id: false});

export const DriverSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    driving: {
        type: Boolean,
        default: false
    },
    geometry: PointSchema

});

export const Driver = mongoose.model('driver', DriverSchema);