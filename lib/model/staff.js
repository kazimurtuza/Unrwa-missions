const mongoose = require('mongoose');
import {User} from "./users";

const staffModel = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Assuming User is the model for users
    agency: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' }, // Assuming User is the model for users
    classification: { type: String }, // Assuming User is the model for users
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    name: {
        type: String,
        required: true,
    },
    family_name: {
        type: String,
        required: false,
    },
    other_name: {
        type: String,
        required: false,
    },
    employee_id: {
        type: String,
        required: false,
    },
    national_id: {
        type: String,
        required: false,
    },
    passport_number_orginal: {
        type: String,
        required: false,
    },
    passport_number_duplicate: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    date_of_birth: {
        type: String,
        required: false,
    },
    staff_role: {
        type: String,
        required: false,
    },
    blood_type: {
        type: String,
        required: false,
    },
    phone_number_one: {
        type: String,
        required: false,
    },
    phone_number_two: {
        type: String,
        required: false,
    },
    signal_number: {
        type: String,
        required: false,
    },
    staff_photo: {
        type: String,
        required: false,
    },
    passport_original_attachment: {
        type: String,
        required: false,
    },
    passport_duplicate_attachment: {
        type: String,
        required: false,
    },
    passport_original_duplicate: {
        type: String,
        required: false,
    },
    national_id_attachment: {
        type: String,
        required: false,
    },
    nationlity: {
        type: String,
        required: false,
    },
    WhatsApp_Number: {
        type: String,
        required: false,
    },
    email_address: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    whatsup_number: {
        type: String,
        required: false,
    },
    statelite_phone: {
        type: String,
        required: false,
    },
    call_signin: {
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

export const Staff = mongoose.models.Staff || mongoose.model("Staff", staffModel)
