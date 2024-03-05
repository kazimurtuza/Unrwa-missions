import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Category } from "@/lib/model/category";
import { connectionStr } from "@/lib/db"

export async function PUT(request,content)
{
    const categoryId=content.params.categoryid;
    const filter={_id:categoryId};
    const payload= await request.json();
    await mongoose.connect(connectionStr);
    const result=await Category.findOneAndUpdate(filter,payload);
    return  NextResponse.json({payload,success:true});
}
export async function GET(request,content){
    const categoryId=content.params.categoryid;
    const record={_id:categoryId};
    await mongoose.connect(connectionStr);
    const result=await Category.findById(record);
    return NextResponse.json({result,success:true});
 }
 
 export async function DELETE(request,content){
    const categoryId=content.params.categoryid;
    const record={_id:categoryId};
    await mongoose.connect(connectionStr);
    const result=await Category.deleteOne(record);
    return NextResponse.json({result,success:true});
 }