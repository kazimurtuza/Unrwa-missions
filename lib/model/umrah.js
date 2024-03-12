import mongoose from 'mongoose';

const umrahSchema = new mongoose.Schema({
    premise_type: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PremiseType"
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Country"
    },
    location_area: {
        type: String, // Corrected
        required: true,
    },
    sub_area: {
        type: String, // Corrected
    },
    longitude: {
        type: String, // Corrected
    },
    latitude: {
        type: String, // Corrected
    },
    installation_name: {
        type: String, // Corrected
        required: true,
    },
    building_code: {
        type: String, // Corrected
    },
    department: {
        type: String, // Corrected
    },
    ownership: {
        type: String, // Corrected
    },
    cls_list: {
        type: String, // Corrected
    },
    des: {
        type: String, // Corrected
    },
    status: {
        type: Number,
        default: 1,
        enum: [0, 1],
    },
    is_delete: {
        type: Boolean,
        default: false, // Default value is set to false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

export const Umrah = mongoose.models.Umrah || mongoose.model("Umrah", umrahSchema);