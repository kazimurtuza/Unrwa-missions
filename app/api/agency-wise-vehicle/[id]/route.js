import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Vehicle } from "@/lib/model/vehicle";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { Agency } from "@/lib/model/agency";

export async function GET(request,content){
 
    let data=[];
    try{
        console.log(connectionStr);
        const uid=content.params.id;
        await mongoose.connect(connectionStr);
        data = await Vehicle.find({ agency: uid,is_delete: 0})
        .populate({
            path: 'agency',
            model: 'Agency'
        })
        .sort({ created_at: -1 });
    }
    catch(error)
    {
        data={success:false,error:error.message};
    }

    return NextResponse.json({result:data,success:true});
}