import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { MissionClassification } from "@/lib/model/missionClassification";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';

export async function GET(){
 
    let data=[];
    try{
        console.log(connectionStr);
        await mongoose.connect(connectionStr);
        data = await MissionClassification
        .find({is_delete:0}).sort({ created_at: -1 });
    }
    catch(error)
    {
        data={success:false,error:error.message};
    }

    return NextResponse.json({result:data,success:true});
}
export async function POST(request) {
    try {
        const payload = await request.json();

        await mongoose.connect(connectionStr);

        const record = {requests_classifications: payload.requests_classifications,is_delete:0};
        const is_findData = await MissionClassification.findOne(record);
        if (is_findData) {
            return NextResponse.json({msg: 'Request Classification must be unique',success:false}, {status: 409});
        }

        const record2 = {abbreviation: payload.abbreviation,is_delete:0};
        const is_findData2 = await MissionClassification.findOne(record2);
        if (is_findData2) {
            return NextResponse.json({msg: 'Abbrevation must be unique',success:false}, {status: 409});
        }


        //mission classification create
        let missionClassification = new MissionClassification(payload);
        let result = await missionClassification.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}