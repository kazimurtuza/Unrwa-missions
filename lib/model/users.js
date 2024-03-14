const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: false,
    },
    img:String,
    user_type:{
        type: String,
        required: true,
        enum: ['user','admin','staff','driver','Driver','Operational Staff','Complimentary Staff'],
    },
    reset_password_code: {
        type: String,
        required: false,
    },
    is_notification_on:{
        type: Number,
        default: 1, // Default value is set to 1=on 0=off
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

export const User = mongoose.models.User || mongoose.model("User", userModel)
