const mongoose = require('mongoose');

const vehicleModel = new mongoose.Schema({
    agency: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' }, // Assuming User is the model for users
    name: {
        type: String,
        required: false,
    },
    registration_number: {
        type: String,
        required: false,
    },
    vehicle_type: {
        type: String,
        required: false,
    },
    vehicle_id: {
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
    brand_type: {
        type: String,
        required: false,
    },
    armouted: {
        type: String,
        required: false,
    },
    fuel_type: {
        type: String,
        required: false,
    },
    carry_out: {
        type: String,
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    description: {
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

export const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleModel)
