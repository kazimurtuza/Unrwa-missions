import mongoose from 'mongoose';

const logHistoryModel = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    action: {
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
export const LogHistory=mongoose.models.LogHistory || mongoose.model("LogHistory",logHistoryModel)