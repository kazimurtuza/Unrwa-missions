import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Driver } from "@/lib/model/driver";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { Vehicle } from "@/lib/model/vehicle";
import { Umrah } from "@/lib/model/umrah";
import { Department } from "@/lib/model/department";

export async function PUT(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const filter = {_id: id};
        const payload = await request.json();
        // return NextResponse.json(payload.password);
        await mongoose.connect(connectionStr);
        const missionCluster=await Umrah.findById(filter);
        const oldData=missionCluster._doc;

        const updatedata={...oldData,...payload}
        result = await Umrah.findOneAndUpdate(filter, updatedata);
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
        data=await Umrah
        .findById(record).populate({
            path:'department',
            model:'Department'
        });
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
        const mission = await Umrah.findById(filter);
        //return NextResponse.json({ success: mission });

        // Update only the is_delete field to 1
        if(mission.is_delete==0)
        {
            mission.is_delete = 1;
        }
        else{
            mission.is_delete = 0;
        }
      

        const result = await mission.save();
        const mission2 = await Umrah.findById(filter);
    } catch (error) {
        return NextResponse.json({ error:error.message, success: false });
    }

    return NextResponse.json({ success: true,mission:mission2 });
}
