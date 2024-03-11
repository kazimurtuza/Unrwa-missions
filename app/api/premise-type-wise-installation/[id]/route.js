import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import { PremiseType } from "@/lib/model/premiseType";
import { Country } from "@/lib/model/country";
import { Umrah } from "@/lib/model/umrah";


export async function GET(request, content) {
    try {
        await mongoose.connect(connectionStr);
        const id = content.params.id;
        let result = await Umrah.find({ is_delete: 0, premise_type:id }).populate([
            {
                path: 'premise_type',
                model: 'PremiseType'
            },
            {
                path: 'country',
                model: 'Country'
            },
    
        ])
        .sort({created_at:-1});
        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error:error.message, success: false});
    }

}