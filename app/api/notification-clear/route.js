import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Notification} from "@/lib/model/notification";
import {AuthUser} from "@/app/helper";

export async function GET(request) {
    try {
        let userInfo = await AuthUser();
        let userId = userInfo.id;
        await mongoose.connect(connectionStr);
        let notification = await Notification.deleteMany({'receiver_id': userId});
        return NextResponse.json({notification, success: true})
    } catch (error) {
        return NextResponse.json({error, success: false})
    }
}

