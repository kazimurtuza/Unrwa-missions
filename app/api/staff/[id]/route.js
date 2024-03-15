import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Staff } from "@/lib/model/staff";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { uploadBase64Img } from "@/app/helper";

export async function GET(request,content){
 
    let data=[];
    try{
        console.log(connectionStr);
        const staffId=content.params.id;
        const record={_id:staffId};
        //return NextResponse.json({result:staffId,success:true});
        await mongoose.connect(connectionStr);
        data=await Staff
        .findById(record).populate({
            path:'user',
            model:'User'
        });
    }
    catch(error)
    {
        data={success:false,error:error.message};
    }

    return NextResponse.json({result:data,success:true});
}

export async function PUT(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const filter = {_id: id};
        const payload = await request.json();
        // return NextResponse.json(payload.password);
        await mongoose.connect(connectionStr);
        const missionCluster=await Staff.findById(filter);
        const oldData=missionCluster._doc;
        if(payload.staff_photo)
        {
            try {
                payload.staff_photo = await uploadBase64Img(payload.staff_photo);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        if(payload.passport_original_attachment)
        {
            try {
                payload.passport_original_attachment = await uploadBase64Img(payload.passport_original_attachment);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        if(payload.passport_duplicate_attachment)
        {
            try {
                payload.passport_duplicate_attachment = await uploadBase64Img(payload.passport_duplicate_attachment);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        if(payload.national_id_attachment)
        {
            try {
                payload.national_id_attachment = await uploadBase64Img(payload.national_id_attachment);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }

        const updatedata={...oldData,...payload}
        result = await Staff.findOneAndUpdate(filter, updatedata);
    } catch (error) {
        return NextResponse.json({error:error.message, success: 'error found'});
    }
    return NextResponse.json({result, success: true});
}

export async function DELETE(request, content) {
    try {
        const id = content.params.id;
        const filter = { _id: id };

        await mongoose.connect(connectionStr);
        const mission = await Staff.findById(filter);

        // Update only the is_delete field to 1
        mission.is_delete = 1;

        const result = await mission.save();
    } catch (error) {
        return NextResponse.json({ error:error.message, success: false });
    }

    return NextResponse.json({ success: true });
}
