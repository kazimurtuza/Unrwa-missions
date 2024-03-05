import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Agency"
    },
    mission_classification: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MissionClassification"
    },
    movement_date: {
        type: Date,
        required: true,
    },
    purpose: {
        type: string,
        required: true,
    },
    remarks: {
        type: string,
    },
    departure_arrivals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MissionDepartureArrival'
    }],
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MissionVehicle'
    }],
    status: {
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1], // Example: Only allow values  0=pending, or 1=completed
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

export const Mission = mongoose.models.Mission || mongoose.model("Mission", missionSchema);
