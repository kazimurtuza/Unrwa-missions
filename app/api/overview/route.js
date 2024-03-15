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
        pendingMission = await Mission
        .find({is_delete:0,status:0}).countDocuments();

        completedMission = await Mission
        .find({is_delete:0,status:1}).countDocuments();

        rejectedMission = await Mission
        .find({is_delete:0,status:2}).countDocuments();

        totalMission = await Mission
        .find({is_delete:0}).countDocuments();

        todayPendingMission = await Mission
        .find({is_delete:0,status:0}).countDocuments();

        todayCompletedMission = await Mission
        .find({is_delete:0,status:1}).countDocuments();

        todayRejectedMission = await Mission
        .find({is_delete:0,status:2}).countDocuments();

        todayTotalMission = await Mission
        .find({is_delete:0}).countDocuments();
    }
    catch(error)
    {
        data={success:false,error:error.message};
    }

    return NextResponse.json({pendingMission,completedMission,rejectedMission,totalMission,todayTotalMission,todayCompletedMission,todayPendingMission,todayRejectedMission,success:true});
}