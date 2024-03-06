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
        const location_list = payload.location_list;
        const vehicle_list = payload.vehicle_list;
        const mission = payload;
        delete mission.location_list;
        delete mission.vehicle_list;
        const missionAdd = await new Mission(payload);
        const missionId= await  missionAdd._id;
        missionAdd.save();
        let length=vehicle_list.length;
        if(location_list.length>0){
            location_list.map(async (item,index)=>{
                    item.mission=await missionId;
                    const missionLocation=  await  new  MissionDepartureArrival(item);
                    missionLocation.save();
            })
        }
        if(vehicle_list.length>0){
            vehicle_list.map(async (item,index)=>{
                item.mission=await missionId;
                const missionVehicle=  await  new  MissionVehicle(item);
                missionVehicle.save();
            })
        }
        return NextResponse.json({length, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let result = await Mission.find({is_delete:0}).populate('departure_arrivals') // Adjust this line
            .exec();

        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error:error.message, success: false});
    }

}