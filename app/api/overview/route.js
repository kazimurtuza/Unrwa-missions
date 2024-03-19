import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Agency } from "@/lib/model/agency";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { uploadBase64Img } from "@/app/helper";
import { Mission } from "@/lib/model/mission";

export async function GET(){

    let pendingMission;
    let completedMission;
    let rejectedMission;
    let totalMission;

    let todayPendingMission;
    let todayCompletedMission;
    let todayRejectedMission;
    let todayTotalMission;
 
    try{
        console.log(connectionStr);
        await mongoose.connect(connectionStr);
        let currentDate = new Date().toJSON().slice(0, 10);
        pendingMission = await Mission.countDocuments({ request_status: "request_received" });

        completedMission = await Mission.countDocuments({ request_status: "mission_completed" });

        rejectedMission = await Mission.countDocuments({ cla_decision: "denied" });

        totalMission = await Mission.countDocuments();

        todayPendingMission = await Mission.countDocuments({ request_status: "request_received",create_date:currentDate });

        todayCompletedMission =  await Mission.countDocuments({ request_status: "mission_completed",completed_date:currentDate});
        todayRejectedMission = await Mission.countDocuments({ cla_decision: "denied",rejected_date:currentDate });

        todayTotalMission = await Mission.countDocuments({create_date:currentDate});

    }
    catch(error)
    {
        data={success:false,error:error.message};
    }

    return NextResponse.json({pendingMission,completedMission,rejectedMission,totalMission,todayTotalMission,todayCompletedMission,todayPendingMission,todayRejectedMission,success:true});
}