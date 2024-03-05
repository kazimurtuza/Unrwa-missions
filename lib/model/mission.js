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
        required:true,
    },
    purpose: {
        type: string,
        required: true,
    },
    remarks: {
        type: string,
    },
    departure_arrival: {
        type: Array,
        required:true,
    },
    vehicle: {
        type: Array,
        required:true,
    },

    status: {
        type: Number,
        default: 1, // Default value if not provided
        enum: [0, 1], // Example: Only allow values  1=active, or 0=inactive
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
