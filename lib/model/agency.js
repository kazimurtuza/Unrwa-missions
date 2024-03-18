const mongoose = require('mongoose');

const agencyModel = new mongoose.Schema({
    agency_cluster: { type: mongoose.Schema.Types.ObjectId, ref: 'Cluster' }, // Assuming User is the model for users

    name: {
        type: String,
        required: true,
    },
    agency_name_acroynm: {
        type: String,
        required: false,
    },
    agency_head: {
        type: String,
        required: false,
    },
    agency_phone: {
        type: String,
        required: false,
    },
    intervision_note: {
        type: String,
        required: false,
    },
    agency_email: {
        type: String,
        required: false,
    },
    agency_physical_address: {
        type: String,
        required: false,
    },
    agency_website: {
        type: String,
        required: false,
    },
    agency_logo: {
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

export const Agency = mongoose.models.Agency || mongoose.model("Agency", agencyModel)
