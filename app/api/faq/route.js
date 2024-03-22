import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Faq} from "@/lib/model/faq";

export async function POST(request) {
    try {
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        let faq = await new Faq(payload);
        faq.save();
        return NextResponse.json({faq, success: true});
    } catch (error) {
        return NextResponse.json({error, success: true});
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let faq =await  Faq.find();
        return NextResponse.json({faq, success: true});
    } catch (error) {
        return NextResponse.json({error, success: true});
    }

}