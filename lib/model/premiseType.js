import mongoose from 'mongoose';

const premiseTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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

export const PremiseType = mongoose.models.PremiseType || mongoose.model("PremiseType", premiseTypeSchema);