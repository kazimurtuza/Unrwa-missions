import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db"
import {User} from "@/lib/model/users";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";

export async function PUT(request, content) {
    let result = [];
    try {
        const userId = content.params.userid;
        const filter = {_id: userId};
        const payload = await request.json();
        // return NextResponse.json(payload.password);
        await mongoose.connect(connectionStr);
        const userInfo=await User.findById(filter);
        const oldData=userInfo._doc;
        if(payload.password){
            let pass=payload.password;
            const hashPassword = await bcrypt.hash(pass, 10);
            payload.password=hashPassword;
        }
        if(payload.img){
            let imgPath=await  uploadBase64Img(payload.img);
            payload.img=imgPath;
        }
        const updatedata={...oldData,...payload}
        const result = await User.findOneAndUpdate(filter, updatedata);
    } catch (error) {
        return NextResponse.json({error, success: 'error found'});
    }
    return NextResponse.json({result, success: true});
}

export async function GET(request, content) {
    let result = [];
    try {
        const userId = content.params.userid;
        const record = {_id: userId};
        await mongoose.connect(connectionStr);
        const result = await User.findById(record);
        return NextResponse.json({result, success: true});
    } catch (error) {
        result = error;
    }
    return NextResponse.json(result);
}

export async function DELETE(request, content) {
    try {
        const userId = content.params.userid;
        const filter = { _id: userId };
        
        const payload = await request.json();

        await mongoose.connect(connectionStr);
        const userInfo = await User.findById(filter);

        if (!userInfo) {
            return NextResponse.json({ error: 'User not found', success: false });
        }

        // Update only the is_delete field to 1
        userInfo.is_delete = 1;

        const result = await userInfo.save();
    } catch (error) {
        return NextResponse.json({ error, success: false });
    }

    return NextResponse.json({ success: true });
}


async function uploadBase64Img(image) {
    try {
        // Convert base64 to buffer
        const imageBuffer = await Buffer.from(image.split('base64,')[1], 'base64');
        // image name
        var filename = await `${uuidv4()}.jpg`; // Use the correct extension
        // Define the absolute path to save the image
        const pathext='public/uploads'
        const imagePath = await path.resolve(pathext, filename);
        await  fs.writeFileSync(imagePath, imageBuffer);
    }catch (e) {
        return NextResponse.json({e, success: 'img upload error found'});
    }

    return 'uploads/'+filename;

}


