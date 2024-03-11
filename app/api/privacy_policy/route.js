import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {PrivacyPolicy} from "@/lib/model/privacyPolicy";

export async function POST(request) {
    try {
        var privacyPolicy;
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        let termsConditionFind = await PrivacyPolicy.findOne();
        if (termsConditionFind) {
            const filter = {"_id": termsConditionFind._id};
            const update = payload;
            privacyPolicy = await PrivacyPolicy.updateOne(filter, update)
        } else {
            privacyPolicy = await new PrivacyPolicy(payload);
            privacyPolicy.save();
        }
        return NextResponse.json({privacyPolicy, success: true});
    } catch (error) {
        return NextResponse.json({error:error.message, success: true});
    }
}
export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let privacyPolicy = await PrivacyPolicy.findOne();
        return NextResponse.json({privacyPolicy, success: true});
    } catch (error) {
        return NextResponse.json({error, success: true});
    }

}