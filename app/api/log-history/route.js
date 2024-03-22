import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {PremiseType} from "../../../lib/model/premiseType";
import { LogHistory } from "@/lib/model/logHistory";
import { User } from "@/lib/model/users";
import { Staff } from "@/lib/model/staff";

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let result = await LogHistory.find({is_delete:0})
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
        return NextResponse.json({error, success: false});
    }

}