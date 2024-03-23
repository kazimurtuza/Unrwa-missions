import mongoose from 'mongoose';
import {Agency} from "./agency";
import {MissionCluster} from "@/lib/model/missionCluster";
import {MissionClassification} from "./missionClassification";

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
    create_date: {
        type: String,
        required: true,
    },
    completed_date: {
        type: String,
    },
    rejected_date: {
        type: String,
    },
    approved_date: {
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
        ref: "MissionClassification",
        default: null,
    },
    does_mission: {
        type: String,
        default: null,
    },
    unops_acu_status: {
        type: String,
        default: null,
    },
    unops_acu: {
        type: String,
    },
    cla: {
        type: String,
        default: null,
    },
    cla_decision: {
        type: String,
        default: null,
    },
    request_status: {
        type: String,
        default: null,
    },
    greenlight_recieve: {
        type: String,
    },
    admin_info_set: {
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1],
    },
    not_passable_road_condition: {
        type: String,
        default: null,
    },
    very_bad_road_condition: {
        type: String,
        default: null,
    },
    bad_road_condition: {
        type: String,
        default: null,
    },
    regular_road_condition: {
        type: String,
        default: null,
    },
    not_passable_presence_eds_erw_uxo: {
        type: String,
        default: null,
    },
    very_bad_presence_eds_erw_uxo: {
        type: String,
        default: null,
    },
    bad_presence_eds_erw_uxo: {
        type: String,
        default: null,
    },
    regular_presence_eds_erw_uxo: {
        type: String,
        default: null,
    },
    humanitarian_assistance: {
        type: String,
    },
    humanitarian_observations: {
        type: String,
        default: null,
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
    report_image_list:{
        type:Array,
        default:[],
    },
    mission_id: {
        type: String,
        required: true,
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
