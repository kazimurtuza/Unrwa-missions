import mongoose from 'mongoose';

const missionVehicleSchema = new mongoose.Schema({
    mission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission'
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency'
    },
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    }],
    is_delete: {
        type: Boolean,
        default: 0, // Default value is set to 0
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
export const MissionVehicle=mongoose.models.missionVehicle || mongoose.model("missionVehicle",missionVehicleSchema)