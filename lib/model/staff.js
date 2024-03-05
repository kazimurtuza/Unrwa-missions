const mongoose = require('mongoose');

const staffModel = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming User is the model for users
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    whatsup_number: {
        type: String,
        required: false,
    },
    statelite_phone: {
        type: String,
        required: false,
    },
    call_signin: {
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

export const Staff = mongoose.models.Staff || mongoose.model("Staff", staffModel)
