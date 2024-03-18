import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Agency } from "@/lib/model/agency";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { uploadBase64Img } from "@/app/helper";
import { RequestStatus } from "@/lib/model/request_status";

export async function GET(){
 
    let data=[];
    try{
        console.log(connectionStr);
        await mongoose.connect(connectionStr);
        data = await RequestStatus
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

        const record = {request_status: payload.request_status,is_delete:0};
        const is_findEmail = await RequestStatus.findOne(record);
        if (is_findEmail) {
            return NextResponse.json({msg: 'Request Status is already present',success:false}, {status: 409});
        }

 
        //agency create
        let agency = new RequestStatus(payload);
        let result = await agency.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}