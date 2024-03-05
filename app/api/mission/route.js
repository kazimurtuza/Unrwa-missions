import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Mission} from "../../../lib/model/mission";

export async function POST(request) {
    try {
        var mission;
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        mission = await new Mission(payload);
        mission.save();
        return NextResponse.json({mission, success: true});
    } catch (error) {
        return NextResponse.json({error:error.message, success: false});
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let umrah = await Umrah.find({is_delete:0});
        return NextResponse.json({umrah, success: true});
    } catch (error) {
        return NextResponse.json({error:error.message, success: false});
    }

}