const mongoose = require('mongoose');

const subareaModel = new mongoose.Schema({
    area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
    name: {
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

export const SubArea = mongoose.models.SubArea || mongoose.model("SubArea", subareaModel)
