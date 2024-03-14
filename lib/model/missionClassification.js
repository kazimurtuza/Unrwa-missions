import mongoose from 'mongoose';

const missionClassificationModel = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    requests_classifications: {
        type: String,
        required: false,
    },
    abbreviation: {
        type: String,
        required: false,
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
export const MissionClassification=mongoose.models.MissionClassification || mongoose.model("MissionClassification",missionClassificationModel)