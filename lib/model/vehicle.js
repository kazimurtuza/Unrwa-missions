const mongoose = require('mongoose');

const vehicleModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    registration_number: {
        type: String,
        required: true,
    },
    vehicle_type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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

export const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleModel)
