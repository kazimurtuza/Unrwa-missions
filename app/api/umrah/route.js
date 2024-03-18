import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Umrah} from "../../../lib/model/umrah";
import { PremiseType } from "@/lib/model/premiseType";
import { Country } from "@/lib/model/country";
import { Department } from "@/lib/model/department";

export async function POST(request) {
    try {
        var result;
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        result = await new Umrah(payload);
        result.save();
        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error, success: false});
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let result = await Umrah.find({ is_delete: 0 }).populate([
            {
                path: 'premise_type',
                model: 'PremiseType'
            },
            {
                path: 'country',
                model: 'Country'
            },
            {
                path: 'department',
                model: 'Department'
            },
    
        ])
        .sort({created_at:-1});
        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error:error.message, success: false});
    }

}