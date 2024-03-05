import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { SubCategory } from "@/lib/model/subcategory";
import { connectionStr } from "@/lib/db";
import {Category} from "@/lib/model/category";

export async function GET(){
 
    let data=[];
    try{
        console.log(connectionStr);
        await mongoose.connect(connectionStr);
        data = await SubCategory.find({ is_delete: 0 }).populate({
            path: 'category_id',
            model: 'Category', // Adjusted to refer to the Category model
        }).sort({ created_at: -1 });
        return NextResponse.json({result:data,success:true});
    }
    catch(error)
    {
        data={success:false,error:error.message};
        return NextResponse.json(data);
    }

}
export async function POST(request) {
    try {
        const payload = await request.json();
        await mongoose.connect(connectionStr);
        let subcategory = new SubCategory(payload);
        const result = await subcategory.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error: error, success: false }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}