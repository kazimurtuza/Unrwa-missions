import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db"
import {User} from "@/lib/model/users";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";
import { MissionClassification } from "@/lib/model/missionClassification";
import { PremiseType } from "@/lib/model/premiseType";

export async function PUT(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const filter = {_id: id};
        const payload = await request.json();
        // return NextResponse.json(payload.password);
        await mongoose.connect(connectionStr);
        const missionCluster=await PremiseType.findById(filter);
        const oldData=missionCluster._doc;
        const record = { name: payload.name, is_delete: 0 };
        const is_findData = await PremiseType.findOne({
            ...record,
            _id: { $ne: missionCluster._id }
        });

        if (is_findData) {
            return NextResponse.json({ msg: 'Name must be unique', success: false }, { status: 409 });
        }


        const updatedata={...oldData,...payload}
        result = await PremiseType.findOneAndUpdate(filter, updatedata);
    } catch (error) {
        return NextResponse.json({error:error.message, success: 'error found'});
    }
    return NextResponse.json({result, success: true});
}

export async function GET(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const record = {_id: id};
        await mongoose.connect(connectionStr);
        const result = await PremiseType.findById(record);
        return NextResponse.json({result, success: true});
    } catch (error) {
        result = error;
    }
    return NextResponse.json(result);
}

export async function DELETE(request, content) {
    try {
        const id = content.params.id;
        const filter = { _id: id };

        await mongoose.connect(connectionStr);
        const mission = await PremiseType.findById(filter);

        // Update only the is_delete field to 1
        if(mission.is_delete==0)
        {
            mission.is_delete = 1;
        }
        else{
            mission.is_delete = 0;
        }

        const result = await mission.save();
    } catch (error) {
        return NextResponse.json({ error:error.message, success: false });
    }

    return NextResponse.json({ success: true });
}
