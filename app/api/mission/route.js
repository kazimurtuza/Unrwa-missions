import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Mission} from "@/lib/model/mission";
import {MissionDepartureArrival} from "@/lib/model/missionDepartureArrival";
import {MissionVehicle} from "@/lib/model/missionVehicle";


export async function POST(request) {
    try {
        var result;
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        const location_list = await payload.location_list;
        const vehicle_list = await payload.vehicle_list;
        const mission = payload;
        delete mission.location_list;
        delete mission.vehicle_list;
        // return NextResponse.json({mission, success: true});
        const missionAdd = await new Mission(mission);
        missionAdd.save();
        result=missionAdd;
        const missionId = await missionAdd._id;

        if (location_list.length > 0) {
            location_list.map(async (item, index) => {
                item.mission = await missionId;
                const missionLocation = await new MissionDepartureArrival(item);
                 missionLocation.save();
            })
        }
        if (vehicle_list.length > 0) {
            vehicle_list.map(async (item, index) => {
                item.mission = await missionId;
                const missionVehicle = await new MissionVehicle(item);
                missionVehicle.save();
            })
        }
        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let result = await Mission.aggregate([
            {
                $lookup: {
                    from: "staffs",
                    localField: "leader",
                    foreignField: "_id",
                    as: "leader_details"
                }
            },
            {
                $lookup: {
                    from: "missionvehicles",
                    localField: "_id",
                    foreignField: "mission",
                    as: "vehicle_list"
                }
            }
            ,
            {
                $lookup: {
                    from: "vehicles", // Collection to join with
                    localField: "vehicle_list.vehicle", // Field from the "missionvehicles" array
                    foreignField: "_id", // Field from the "vehicles" collection
                    as: "vehicle_details" // Output array field where joined documents will be stored
                }
            },

            {
                $lookup: {
                    from: "staffs",
                    localField: "vehicle_list.staff.staff_id",
                    foreignField: "_id",
                    as: "staff_details"
                }
            },
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

        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }

}