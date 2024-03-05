import {headers} from "next/headers";
import jwt from "jsonwebtoken";
import {NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";

export async function AuthUser(){
    const headerdata=headers();
    const bearerToken = headerdata.get("authorization");
    const token = bearerToken.split(' ')[1];
    let info=await jwt.decode(token);

    return info;

}

export async function uploadBase64Img(image) {
    try {
        // Convert base64 to buffer
        const imageBuffer = await Buffer.from(image.split('base64,')[1], 'base64');
        // image name
        var filename = await `${uuidv4()}.jpg`; // Use the correct extension
        // Define the absolute path to save the image
        const pathext = 'public/uploads'
        const imagePath = await path.resolve(pathext, filename);
        await fs.writeFileSync(imagePath, imageBuffer);

    } catch (e) {
        return NextResponse.json({e, success: 'img upload error found'});
    }

    return 'uploads/' + filename;

}

