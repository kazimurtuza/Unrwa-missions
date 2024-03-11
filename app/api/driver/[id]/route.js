import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Driver } from "@/lib/model/driver";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';

export async function GET(request,content){
 
    let data=[];
    try{
        console.log(connectionStr);
        const staffId=content.params.id;
        const record={_id:staffId};
        //return NextResponse.json({result:staffId,success:true});
        await mongoose.connect(connectionStr);
        data=await Driver
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