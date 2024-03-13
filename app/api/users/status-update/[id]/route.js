import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db"
import {User} from "@/lib/model/users";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";

export async function PUT(request, content) {
    let result = [];
    try {
        const id = content.params.id;
        const filter = {_id: id};
        const payload = await request.json();
        // return NextResponse.json(payload.password);
        await mongoose.connect(connectionStr);
        const userInfo=await User.findById(filter);
        const oldData=userInfo._doc;
        payload.status=1;
        if(userInfo.status==0)
        {
            payload.status=1;
        }
        else
        {
            payload.status=0;
        }
        const updatedata={...oldData,...payload}
        result = await User.findOneAndUpdate(filter, updatedata);
    } catch (error) {
        return NextResponse.json({error:error.message, success: 'error found'});
    }
    return NextResponse.json({result, success: true});
}


