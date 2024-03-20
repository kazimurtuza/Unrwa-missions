import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Driver } from "@/lib/model/driver";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { Vehicle } from "@/lib/model/vehicle";

export async function PUT(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const filter = {_id: id};
        const payload = await request.json();
        // return NextResponse.json(payload.password);
        await mongoose.connect(connectionStr);
        const missionCluster=await Vehicle.findById(filter);
        const record = { vehicle_id: payload.vehicle_id, is_delete: 0 };
        const is_findData = await Vehicle.findOne({
            ...record,
            _id: { $ne: missionCluster._id }
        });

        if (is_findData) {
            return NextResponse.json({ msg: 'Vehicle ID must be unique', success: false }, { status: 409 });
        }


        const record2 = { vehicle_plate_number: payload.vehicle_plate_number, is_delete: 0 };
        const is_findData2 = await Vehicle.findOne({
            ...record2,
            _id: { $ne: missionCluster._id }
        });

        if (is_findData2) {
            return NextResponse.json({ msg: 'Vehicle Plate Number must be unique', success: false }, { status: 409 });
        }
        const oldData=missionCluster._doc;

        const updatedata={...oldData,...payload}
        result = await Vehicle.findOneAndUpdate(filter, updatedata);
    } catch (error) {
        return NextResponse.json({error:error.message, success: 'error found'});
    }
    return NextResponse.json({result, success: true});
}

export async function GET(request,content){
 
    let data=[];
    try{
        console.log(connectionStr);
        const staffId=content.params.id;
        const record={_id:staffId};
        //return NextResponse.json({result:staffId,success:true});
        await mongoose.connect(connectionStr);
        data=await Vehicle
        .findById(record);
    }
    catch(error)
    {
        data={success:false,error:error.message};
    }

    return NextResponse.json({result:data,success:true});
}

export async function DELETE(request, content) {
    try {
        const id = content.params.id;
        const filter = { _id: id };

        await mongoose.connect(connectionStr);
        const mission = await Vehicle.findById(filter);

        // Update only the is_delete field to 1
        mission.is_delete = 1;

        const result = await mission.save();
    } catch (error) {
        return NextResponse.json({ error:error.message, success: false });
    }

    return NextResponse.json({ success: true });
}
