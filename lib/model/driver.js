const mongoose = require('mongoose');

const driverModel = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming User is the model for users
    agency: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' }, // Assuming User is the model for users
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
    vehicle_plate_number: {
        type: String,
        required: false,
    },
    capacity: {
        type: String,
        required: false,
    },
    brand_name: {
        type: String,
        required: false,
    },
    body_type: {
        type: String,
        required: false,
    },
    fuel_type: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    armoured: {
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
