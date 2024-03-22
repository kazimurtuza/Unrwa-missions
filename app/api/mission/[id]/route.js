import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Mission} from "@/lib/model/mission";
import {MissionDepartureArrival} from "@/lib/model/missionDepartureArrival";
import {MissionVehicle} from "@/lib/model/missionVehicle";



export async function GET(request, content) {

    try {
        const id = content.params.id;
        await mongoose.connect(connectionStr);
        let mission=await Mission.findOne({_id:id}).populate('mission_cluster').populate('agency.agency_id').populate({
            path: 'leader',
            populate: {
                path: 'user'
            }
        });
        let missionLocation=await MissionDepartureArrival.find({mission:id})
            .populate('departure_umrah_id')
            .populate('departure_premise_type')
            .populate('arrival_premise_type')
            .populate('arrival_umrah_id')


        let missionVehicle= await MissionVehicle.find({mission:id})
            .populate('staff.staff_id')
            .populate('vehicle')
            .populate('driver')
            .populate('agency');


         let data={mission:mission,places:missionLocation,vehicles:missionVehicle}


        //
        // data = await Mission.aggregate([
        //     {
        //         $match: {
        //             _id: new mongoose.Types.ObjectId(id)
        //         }
        //     },
        //     // {
        //     //     $lookup: {
        //     //         from: "staffs",
        //     //         localField: "leader",
        //     //         foreignField: "_id",
        //     //         as: "leader_details"
        //     //     }
        //     // },
        //     // {
        //     //     $lookup: {
        //     //         from: "missionvehicles",
        //     //         localField: "_id",
        //     //         foreignField: "mission",
        //     //         as: "vehicle_list"
        //     //     }
        //     // }
        //     // ,
        //     // {
        //     //     $lookup: {
        //     //         from: "vehicles", // Collection to join with
        //     //         localField: "vehicle_list.vehicle", // Field from the "missionvehicles" array
        //     //         foreignField: "_id", // Field from the "vehicles" collection
        //     //         as: "vehicle_details" // Output array field where joined documents will be stored
        //     //     }
        //     // },
        //
        //     // {
        //     //     $lookup: {
        //     //         from: "staffs",
        //     //         localField: "vehicle_list.staff.staff_id",
        //     //         foreignField: "_id",
        //     //         as: "staff_details"
        //     //     }
        //     // },
        //     {
        //         $lookup: {
        //             from: "missiondeparturearrivallists",
        //             localField: "_id",
        //             foreignField: "mission",
        //             as: "depature_arrival_details"
        //         }
        //     }
        // ]) // Adjust this line
        //     .exec();

        return NextResponse.json({result:data, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }

}