import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {uploadBase64Img} from "@/app/helper";
import {AppSetting} from "@/lib/model/setting";

export async function POST(request) {
    var result;
    try {
        const payload = await (request.json());
        if (payload.app_logo) {
            let path_name = await uploadBase64Img(payload.app_logo);
            payload.app_logo = await path_name;
        }
        await mongoose.connect(connectionStr);
        let info = await AppSetting.findOne();
        if (info) {
            let setting = await AppSetting.findOneAndUpdate({'_id': info._id}, payload);
            result = setting;
        } else {
            let setting = new AppSetting(payload);
            result = await setting.save();
        }
    } catch (error) {
        return NextResponse.json(error.message);
    }
    return NextResponse.json({result, success: true}, {status: 200});
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