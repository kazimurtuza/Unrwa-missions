import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {PremiseType} from "../../../lib/model/premiseType";


export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let result = await PremiseType.find().sort({created_at:-1});
        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error, success: false});
    }

}