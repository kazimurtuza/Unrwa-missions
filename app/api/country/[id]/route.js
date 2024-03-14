import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db"
import {User} from "@/lib/model/users";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";
import { Agency } from "@/lib/model/agency";
import { uploadBase64Img } from "@/app/helper";
import { Country } from "@/lib/model/country";

export async function PUT(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const filter = {_id: id};
        const payload = await request.json();
        // return NextResponse.json(payload.password);
        await mongoose.connect(connectionStr);
        const country=await Country.findById(filter);
        const oldData=country._doc;


        const updatedata={...oldData,...payload}
        result = await Country.findOneAndUpdate(filter, updatedata);
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
        const result = await Country.findById(record);
        return NextResponse.json({result, success: true});
    } catch (error) {
        result = error.message;
    }
    return NextResponse.json(result);
}

export async function DELETE(request, content) {
    try {
        const id = content.params.id;
        const filter = { _id: id };

        await mongoose.connect(connectionStr);
        const mission = await   Country.findById(filter);

        // Update only the is_delete field to 1
        mission.is_delete = 1;

        const result = await mission.save();
    } catch (error) {
        return NextResponse.json({ error:error.message, success: false });
    }

    return NextResponse.json({ success: true });
}
