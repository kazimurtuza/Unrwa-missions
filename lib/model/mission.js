import mongoose from 'mongoose';
import {Agency} from "./agency";
import {MissionCluster} from "@/lib/model/missionCluster";

const missionSchema = new mongoose.Schema({
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Staff"
    },
    agency: {
        type: [
            {
                agency_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    ref: "Agency"
                }
            }
        ],
        required: true,
    },
    mission_classification: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "MissionClassification"
    },
    mission_cluster: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "MissionCluster"
    },
    movement_date: {
        type: Date,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    remarks: {
        type: String,
    },
    departure_arrivals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MissionDepartureArrival'
    }],
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MissionVehicle'
    }],
    mission_classification_info: {
        type: String,
    },
    does_mission: {
        type: String,
    },
    unops_acu_status: {
        type: String,
    },
    unops_acu: {
        type: String,
    },
    cla: {
        type: String,
    },
    cla_decision: {
        type: String,
    },
    request_status: {
        type: String,
    },
    greenlight_recieve: {
        type: String,
    },
    admin_info_set: {
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1],
    },

    status: {
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1], // Example: Only allow values  0=pending, or 1=completed
    },
    is_delete: {
        type: Boolean,
        default: 0, // Default value is set to 0
    },
    created_date: {
        type: Date,
        default: Date.now,
    },

    created_at: {
        type: Date,
        default: Date.now,
    },

});

export const Mission = mongoose.models.Mission || mongoose.model("Mission", missionSchema);
