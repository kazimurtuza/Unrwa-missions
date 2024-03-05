import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Category } from "@/lib/model/category";
import { connectionStr } from "@/lib/db";

export async function GET(){
 
    let data=[];
    try{
        console.log(connectionStr);
        await mongoose.connect(connectionStr);
        data = await Category.find({is_delete:0}).sort({created_at: -1});
    }
    catch(error)
    {
        data={success:false};
    }

    return NextResponse.json({result:data,success:true});
}
export async function POST(request) {
    try {
        const payload = await request.json();
        await mongoose.connect(connectionStr);
        let category = new Category(payload);
        const result = await category.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error: error, success: false }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}