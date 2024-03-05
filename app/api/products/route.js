import {NextResponse} from "next/server";
import mongoose from "mongoose";
// import { Product } from "@/lib/model/product";
import {Product} from "@/lib/model/product";
import {connectionStr} from "@/lib/db";
import {Category} from "@/lib/model/category";
import {SubCategory} from "@/lib/model/subcategory";
import {User} from "@/lib/model/users"


import fs from 'fs';
import path from 'path';
import {v4 as uuidv4} from 'uuid';
import {AuthUser} from "@/app/helper";

export async function GET() {
    let result = [];
    try {
        await mongoose.connect(connectionStr);
        result = await Product.find({ is_delete: 0 }).populate([
            {
                path: 'category_id',
                model: 'Category', // Ensure this matches the name of your category model
            },
            {
                path: 'subcategory_id',
                model: 'SubCategory', // Ensure this matches the name of your subcategory model
            },
            {
                path: 'user_id',
                model: 'User', // Ensure this matches the name of your subcategory model
            },
        ]);
    } catch (error) {
        result = {success: false, message: error.message};
    }
    return NextResponse.json({result: result, success: true});
}

export async function POST(request) {
    var result;
    try {
        let user = await AuthUser();
        let user_id = user.id;
        const payload = await request.json();

        // Assuming payload.images is an array of base64 strings
        var imageLinks = [];

        // base64  image  upload
        for (const image of payload.images) {
            try {
                let uploadLink = await uploadBase64Img(image);
                imageLinks.push(uploadLink);
            } catch (e) {
                return NextResponse.json({e, success: 'Img upload error found'});
            }
        }
        // Assuming mongoose and Product are properly defined
        let dbConnect = await mongoose.connect(connectionStr);
        let product = new Product({...payload, user_id, images: imageLinks});
        result = await product.save();
    } catch (error) {
        // return NextResponse.json(error);
        return NextResponse.json({error, success: 'error found'});
    }
    return NextResponse.json({result, success: true});
}


async function uploadBase64Img(image) {
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
