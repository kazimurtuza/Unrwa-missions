import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {TermsCondition} from "@/lib/model/termsCondition";

export async function POST(request) {
    try {
        var termsCondition;
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        let termsConditionFind = await TermsCondition.findOne();
        if (termsConditionFind) {
            const filter = {"_id": termsConditionFind._id};
            const update = payload;
            termsCondition = await TermsCondition.updateOne(filter, update)
        } else {
            termsCondition = await new TermsCondition(payload);
            termsCondition.save();
        }
        return NextResponse.json({termsCondition, success: true});
    } catch (error) {
        return NextResponse.json({error, success: true});
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let termsCondition = await TermsCondition.findOne();
        return NextResponse.json({termsCondition, success: true});
    } catch (error) {
        return NextResponse.json({error, success: true});
    }

}