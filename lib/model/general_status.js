const mongoose = require('mongoose');

const generalStatusModel = new mongoose.Schema({
    status: {
        type: String,
        required: true,
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

export const GeneralStatus = mongoose.models.GeneralStatus || mongoose.model("GeneralStatus", generalStatusModel)
