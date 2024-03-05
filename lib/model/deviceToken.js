import mongoose from 'mongoose';

const deviceTokenModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    device_token: {type: mongoose.Schema.Types.ObjectId},
    is_delete: {
        type: Boolean,
        default: 0, // Default value is set to 0
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const DeviceToken=mongoose.models.device_tokens || mongoose.model("device_tokens",deviceTokenModel)