import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Mission} from "@/lib/model/mission";
import {MissionDepartureArrival} from "@/lib/model/missionDepartureArrival";
import {MissionVehicle} from "@/lib/model/missionVehicle";



export async function GET(request, content) {
    let data=[];
    try {
        const id = content.params.id;
        await mongoose.connect(connectionStr);
        data = await Mission.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            // {
            //     $lookup: {
            //         from: "staffs",
            //         localField: "leader",
            //         foreignField: "_id",
            //         as: "leader_details"
            //     }
            // },
            // {
            //     $lookup: {
            //         from: "missionvehicles",
            //         localField: "_id",
            //         foreignField: "mission",
            //         as: "vehicle_list"
            //     }
            // }
            // ,
            // {
            //     $lookup: {
            //         from: "vehicles", // Collection to join with
            //         localField: "vehicle_list.vehicle", // Field from the "missionvehicles" array
            //         foreignField: "_id", // Field from the "vehicles" collection
            //         as: "vehicle_details" // Output array field where joined documents will be stored
            //     }
            // },

            // {
            //     $lookup: {
            //         from: "staffs",
            //         localField: "vehicle_list.staff.staff_id",
            //         foreignField: "_id",
            //         as: "staff_details"
            //     }
            // },
            {
                $lookup: {
                    from: "missiondeparturearrivallists",
                    localField: "_id",
                    foreignField: "mission",
                    as: "depature_arrival_details"
                }
            }
        ]) // Adjust this line
            .exec();

        return NextResponse.json({result:data, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }

}