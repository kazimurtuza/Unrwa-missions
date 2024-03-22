import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Umrah} from "../../../lib/model/umrah";
import { PremiseType } from "@/lib/model/premiseType";
import { Country } from "@/lib/model/country";
import { Department } from "@/lib/model/department";
import { Area } from "@/lib/model/area";
import { SubArea } from "@/lib/model/sub_area";
import { ClaList } from "@/lib/model/cla_list";


export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let result = await Umrah.find().populate([
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
            {
                path: 'location_area',
                model: 'Area'
            },
            {
                path: 'sub_area',
                model: 'SubArea'
            }
    
        ])
        .sort({created_at:-1});
        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error:error.message, success: false});
    }

}