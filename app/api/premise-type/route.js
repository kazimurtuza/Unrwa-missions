import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {PremiseType} from "../../../lib/model/premiseType";

export async function POST(request) {
    try {
        var result;
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        result = await new PremiseType(payload);
        result.save();
        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error, success: false});
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let result = await PremiseType.find({is_delete:0});
        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error, success: false});
    }

}