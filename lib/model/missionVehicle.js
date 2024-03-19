import mongoose from 'mongoose';
import {Staff} from "./staff";
import {Driver} from "./driver";
import {Vehicle} from "./vehicle";
import {Agency} from "./agency";

const missionVehicleSchema = new mongoose.Schema({
    mission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission',
        required: true,
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff',
        required: true,
    },
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agency',
        required: true,
    },
    carried: {
        type:[],
    },
    staff: {
        type: [
            {
                staff_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Staff"
                }
            }
        ],
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
export const MissionVehicle = mongoose.models.missionVehicle || mongoose.model("missionVehicle", missionVehicleSchema)