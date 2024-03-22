import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {User} from "@/lib/model/users";
import { connectionStr } from "@/lib/db";

export async function GET(){

    let result=[];

    try {
        await mongoose.connect(connectionStr);
        const result = await User.find({ user_type: { $in: ['driver', 'staff'] } }).sort({created_at:-1});
        return NextResponse.json(result);
    } catch (error) {
        // Handle the error appropriately
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred" });
    }

}
export async function POST(request) {
    let result=[];
    try{
        const payload= await(request.json());
        await mongoose.connect(connectionStr);
        let user = new User(payload);
         result=await user.save();
    }
    catch(error)
    {
        result=error;
    }
    return NextResponse.json({result,success:true});
}



