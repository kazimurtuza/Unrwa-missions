import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import { uploadBase64Img } from "@/app/helper";
import { AppSetting } from "@/lib/model/setting";

export async function POST(request) {
    var result;
    try {
        const payload = await request.json();

        // If app_logo exists, upload it
        if (payload.app_logo) {
            try {
                payload.app_logo = await uploadBase64Img(payload.app_logo);
            } catch (e) {
                return NextResponse.json({ e, success: 'img upload error found' });
            }
        }

        // Split the 'to' field into an array if it's a string
        if (typeof payload.to === 'string') {
            payload.to = payload.to.split(',');
        }
        if (typeof payload.bcc === 'string') {
            payload.bcc = payload.bcc.split(',');
        }
        if (typeof payload.copy === 'string') {
            payload.copy = payload.copy.split(',');
        }
        if (typeof payload.cla === 'string') {
            payload.cla = payload.cla.split(',');
        }


        await mongoose.connect(connectionStr);
        let info = await AppSetting.findOne();
        if (info) {
            let setting = await AppSetting.findOneAndUpdate({ '_id': info._id }, payload);
            result = setting;
        } else {
            let setting = new AppSetting(payload);
            result = await setting.save();
        }
    } catch (error) {
        return NextResponse.json(error.message);
    }
    return NextResponse.json({ result, success: true }, { status: 200 });
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        var info = await AppSetting.findOne();
    } catch (error) {
        return NextResponse.json(error);
    }
    return NextResponse.json(info);
}
