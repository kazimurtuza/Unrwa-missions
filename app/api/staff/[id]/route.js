import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Staff } from "@/lib/model/staff";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { Department } from "@/lib/model/department";
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
        .findById(record).populate([{
            path:'user',
            model:'User'
        },
        {
            path:'department',
            model:'Department'
        }]
        );
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
        //return NextResponse.json({error:payload.staff_photo, success: false});

        const record = { email: payload.email, is_delete: 0 };
        const is_findData = await Staff.findOne({
            ...record,
            _id: { $ne: missionCluster._id }
        });

        if (is_findData) {
            return NextResponse.json({ msg: 'Email must be unique', success: false }, { status: 409 });
        }
        

        const record2 = { national_id: payload.national_id, is_delete: 0 };
        const is_findData2 = await Staff.findOne({
            ...record2,
            _id: { $ne: missionCluster._id }
        });

        if (is_findData2) {
            return NextResponse.json({ msg: 'National ID must be unique', success: false }, { status: 409 });
        }

        const record3 = { employee_id: payload.employee_id, is_delete: 0 };
        const is_findData3 = await Staff.findOne({
            ...record3,
            _id: { $ne: missionCluster._id }
        });

        if (is_findData3) {
            return NextResponse.json({ msg: 'Employee ID must be unique', success: false }, { status: 409 });
        }


        if(payload.staff_photo)
        {
            try {
                payload.staff_photo = await uploadBase64Img(payload.staff_photo);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        else
        {
            payload.staff_photo=missionCluster.staff_photo;
        }
        if(payload.passport_original_attachment)
        {
            try {
                payload.passport_original_attachment = await uploadBase64Img(payload.passport_original_attachment);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        else
        {
            payload.passport_original_attachment=missionCluster.passport_original_attachment;
        }
        if(payload.passport_duplicate_attachment)
        {
            try {
                payload.passport_duplicate_attachment = await uploadBase64Img(payload.passport_duplicate_attachment);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        else
        {
            payload.passport_duplicate_attachment=missionCluster.passport_duplicate_attachment;
        }
        if(payload.national_id_attachment)
        {
            try {
                payload.national_id_attachment = await uploadBase64Img(payload.national_id_attachment);
            } catch (e) {
                return NextResponse.json({e, success: 'img upload error found'});
            }
        }
        else
        {
            payload.national_id_attachment=missionCluster.national_id_attachment;
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
