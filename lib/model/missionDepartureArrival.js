import mongoose from 'mongoose';
import {Umrah} from "./umrah";
import {PremiseType} from "./premiseType";

const missionDepartureArrivalDataSchema = new mongoose.Schema({
    mission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mission',
        required:true,
    },
    departure_premise_type: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'PremiseType',
    },
    departure_umrah_type: {
        type:String,
        default: 0, // Default value if not provided
        enum: [0, 1], // value 1 = umrah,0=not umrah
        required:true,
    },
    checkin_status:{
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1], // value 1 =completed 0=pending
    },
    checkout_status:{
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1], // value 1 =completed 0=pending
    },
    
    departure_umrah_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Umrah'
    },
    departure_building_code:{
        type: String,
    },
    departure_installation_name: {
        type: String,
    },
    departure_time: {
        type: String,
        required: true,
    },
    departure_latitude: {
        type: String,
    },
    departure_longitude: {
        type: String,
    },
    arrival_time: {
        type: String,
        required: true,
    },
    arrival_premise_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PremiseType'
    },

    arrival_umrah_type: {
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1], // value 1 = umrah,0=not umrah
        required:true,
    },
    arrival_umrah_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Umrah'
    },
    arrival_installation_name: {
        type: String,
    },
    arrival_latitude: {
        type: String,
    },
    arrival_building_code:{
        type: String,
    },
    arrival_longitude: {
        type: String,
    },
    mission_status: {
        type: Number,
        default: 0, // Default value if not provided
        enum: [0, 1], // value 1 =completed 0=pending
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
export const MissionDepartureArrival = mongoose.models.MissionDepartureArrivalList || mongoose.model("MissionDepartureArrivalList", missionDepartureArrivalDataSchema)