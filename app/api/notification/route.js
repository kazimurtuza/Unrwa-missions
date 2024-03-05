import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Notification} from "@/lib/model/notification";
import {AuthUser} from "@/app/helper";

export async function POST(request) {
    try {
        const payload = await request.json();
        let userInfo = await AuthUser();
        let userId = userInfo.id;
        await mongoose.connect(connectionStr);
        let newObj = {
            ...payload,
            'sender_id': userId,
        }
        let notification = await new Notification(newObj);
        notification.save();
        return NextResponse.json({notification, success: true, status: 201})

    } catch (error) {
        return NextResponse.json({error, success: false})
    }

}
export async function GET(request) {
    try {
        const info = await new URL(request.url)
        const searchParams = info.searchParams;
        let page = Number(searchParams.get('page')) || 1;
        let limit = Number(searchParams.get('limit')) || 12;
        let skip = (page - 1) * limit;
        let userInfo = await AuthUser();
        let userId = userInfo.id;
        await mongoose.connect(connectionStr);
        let notification = await Notification.find({'receiver_id': userId}).skip(skip).limit(limit);
        return NextResponse.json({notification, success: true})
    } catch (error) {
        return NextResponse.json({error, success: false})
    }
}

