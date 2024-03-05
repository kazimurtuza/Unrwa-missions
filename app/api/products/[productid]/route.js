import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {Product} from "@/lib/model/product";
import {ProductView} from "@/lib/model/productView";
import {connectionStr} from "@/lib/db"
import {AuthUser, uploadBase64Img} from "@/app/helper";

export async function PUT(request, content) {
    let result = [];
    try {
        const user=await AuthUser();
        const user_id=user.id;
        let images=[];
        const productId = content.params.productid;
        const filter = {_id: productId};
        const payload = await request.json();

        if(payload.old_images && payload.old_images !=""){
            images=payload.old_images;
        }
        if(payload.new_images){
            for(const newImg of payload.new_images){
               let imagePath=await uploadBase64Img(newImg);
                images.push(imagePath)
            }
        }
        await mongoose.connect(connectionStr);
        const product=await Product.findById(filter);

        const updateDate={...product._doc,...payload,images,user_id};

        // return NextResponse.json(updateDate);
        const result = await Product.findOneAndUpdate(filter,updateDate);
        return NextResponse.json(result);
    } catch (error) {
        result = error;
    }
    return NextResponse.json(result);
}

export async function GET(request, content) {
    let result = [];
    try {
        const productId = content.params.productid;
        const record = {_id: productId};
        await mongoose.connect(connectionStr);
        result = await Product.findById(record);

    } catch (error) {
        result = error;
    }
    return NextResponse.json({result, success: true});
}

export async function DELETE(request, content) {
    const productId = content.params.productid;
    const filter = {_id: productId};
    await mongoose.connect(connectionStr);
    const findItem = await Product.findById(filter);
    const is_delete=true;
    const info=findItem._doc;
    const updateData= await {...info,is_delete}
    const result = await Product.findOneAndUpdate(filter, updateData);
    return NextResponse.json({result, success: true});
}
