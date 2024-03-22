import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { MissionClassification } from "@/lib/model/missionClassification";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { Agency } from "@/lib/model/agency";
import { MissionCluster } from "@/lib/model/missionCluster";

export async function GET(){
 
    let data=[];
    try{
        //console.log(connectionStr);
        await mongoose.connect(connectionStr);
        data = await MissionCluster.find({is_delete:0}).populate({
            path:'agency',
            Model:'Agency'
        })
        .sort({ created_at: -1 });
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

        //check if payload agency is empty
        if (!payload.agency) {
            payload.agency = null;
        }

        //mission classification create
        let missionCluster = new MissionCluster(payload);
        let result = await missionCluster.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}