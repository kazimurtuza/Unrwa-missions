import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { SubCategory } from "@/lib/model/subcategory";
import { connectionStr } from "@/lib/db"

export async function PUT(request,content)
{
    const subcategoryId=content.params.subcategoryid;
    const filter={_id:subcategoryId};
    const payload= await request.json();
    await mongoose.connect(connectionStr);
    const result=await SubCategory.findOneAndUpdate(filter,payload);
    return  NextResponse.json({payload,success:true});
}
export async function GET(request,content){
    const subcategoryId=content.params.subcategoryid;
    const record={_id:subcategoryId};
    await mongoose.connect(connectionStr);
    const result=await SubCategory.findById(record);
    return NextResponse.json({result,success:true});
 }
 
 export async function DELETE(request,content){
    const subcategoryId=content.params.subcategoryid;
    const record={_id:subcategoryId};
    await mongoose.connect(connectionStr);
    const result=await SubCategory.deleteOne(record);
    return NextResponse.json({result,success:true});
 }