const mongoose = require('mongoose');

const driverModel = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming User is the model for users
    name: {
        type: String,
        required: true,
    },
    driver_id: {
        type: String,
        required: true,
    },
    jawwal_phone: {
        type: String,
        required: false,
    },
    ooredo_phone: {
        type: String,
        required: false,
    },
    whatsup_number: {
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

export const Driver = mongoose.models.Driver || mongoose.model("Driver", driverModel)
