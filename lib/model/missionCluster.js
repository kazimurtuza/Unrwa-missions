import mongoose from 'mongoose';

const missionClusterModel = new mongoose.Schema({
    agency: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency',required: false }, // Assuming User is the model for users
    name: {
        type: String,
        required: true,
    },
    lead_office_name: {
        type: String,
        required: false,
    },
    lead_office_email: {
        type: String,
        required: false,
    },
    lead_office_phone: {
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
export const MissionCluster=mongoose.models.MissionCluster || mongoose.model("MissionCluster",missionClusterModel)