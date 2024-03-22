import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import { LogHistory } from "@/lib/model/logHistory";
import { User } from "@/lib/model/users";
import { Staff } from "@/lib/model/staff";

export async function GET(request,content) {
    try {
        await mongoose.connect(connectionStr);
        const staffId = content.params.id;

        let result = await LogHistory.find({is_delete:0,staff:staffId})
        .populate([{
            path:'user',
            Model:'User'
        },
        {
            path:'staff',
            Model:'Staff'
        }
        ])
        .sort({created_at:-1});
        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error:error.message, success: false});
    }

}