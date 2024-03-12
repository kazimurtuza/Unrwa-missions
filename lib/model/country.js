const mongoose = require('mongoose');

const countryModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    alpha2: {
        type: String,
        required: false,
    },
    alpha3: {
        type: String,
        required: false,
    },
    country_code: {
        type: String,
        required: false,
    },
    iso3166: {
        type: String,
        required: false,
    },
    iso_port: {
        type: String,
        required: false,
    },
    region: {
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

export const Country = mongoose.models.Country || mongoose.model("Country", countryModel)
