import mongoose from 'mongoose';

const MissionDepartureArrivalSchema = new mongoose.Schema({

    mission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission'
    },
    departure_premise_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PremiseType'
    },
    departure_installation_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Umrah'
    },
    departure_time: {
        type: String,
        required: true,
    },
    departure_latitude: {
        type: number,
    },
    departure_longitude: {
        type: number,
    },
    arrival_time: {
        type: String,
        required: true,
    },
    arrival_premise_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PremiseType'
    },
    arrival_installation_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Umrah'
    },
    arrival_latitude: {
        type: number,
    },
    arrival_longitude: {
        type: number,
    },
    mission_status: {
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1], // value 1 =completed 0=pending
    },
    is_delete: {
        type: Boolean,
        default: 0, // Default value is set to 0
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
export const MissionDepartureArrival = mongoose.models.MissionDepartureArrival || mongoose.model("MissionDepartureArrival", MissionDepartureArrivalSchema)