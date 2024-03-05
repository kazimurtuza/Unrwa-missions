import mongoose from 'mongoose';

const notificationModel = new mongoose.Schema({
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
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

export const Notification=mongoose.models.notifications || mongoose.model("notifications",notificationModel)