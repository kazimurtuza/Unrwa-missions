import mongoose from 'mongoose';

const missionVehicleSchema = new mongoose.Schema({
    mission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission',
        required:true,
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required:true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required:true,
    },
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required:true,
    },
    staff: {
        type: Array,
        required:true,
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
export const MissionVehicle=mongoose.models.missionVehicle || mongoose.model("missionVehicle",missionVehicleSchema)