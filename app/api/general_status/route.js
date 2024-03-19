import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Agency } from "@/lib/model/agency";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { uploadBase64Img } from "@/app/helper";
import { Department } from "@/lib/model/department";
import { AcuStatus } from "@/lib/model/acu_status";
import { GeneralStatus } from "@/lib/model/general_status";

export async function GET(){
 
    let data=[];
    try{
        console.log(connectionStr);
        await mongoose.connect(connectionStr);
        data = await GeneralStatus
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

        const record = {status: payload.status,is_delete:0};
        const is_findData = await GeneralStatus.findOne(record);
        if (is_findData) {
            return NextResponse.json({msg: 'Status must be unique',success:false}, {status: 409});
        }

        //create
        let department = new GeneralStatus(payload);
        let result = await department.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}