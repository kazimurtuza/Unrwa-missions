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
    locations_area: {
        type: string,
        required: true,
    },
    sub_area: {
        type: string,
    },
    longitude: {
        type: string,
    },
    latitude: {
        type: string,
    },
    installation_name: {
        type: string,
        required: true,
    },
    building_code: {
        type: string,
    },
    department: {
        type: string,
    },
    ownership: {
        type: string,
    },
    cls_list: {
        type: string,
    },
    des: {
        type: string,
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

export const Umrah = mongoose.models.Umrah || mongoose.model("Umrah", umrahSchema);
