import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import jwt from "jsonwebtoken";
import { User } from "@/lib/model/users";


export async function POST(request) {
    
    // Extract email from the request body
    const { email,code } = await request.json();
    let msg;
    const update={};
    
 
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionStr);

        // Check if the user with the provided email exists
         const user = await User.findOne({ email , is_delete:false});
        
        const filter = { email , is_delete:false};

        if (user) {

            //check this code is right or not
            if(user.reset_password_code == code)
            {
                update.reset_password_code=null;
                const userInfo=await User.findOneAndUpdate(filter, update);
                return NextResponse.json({ result: "Email verification successfully.", success: true }, { status: 200 });
            }
            else
            {
                msg="Invalid Code.";
                return NextResponse.json({ msg, success: false });
            }

        } else {
            return NextResponse.json({ msg: "User not found with the provided email.",success:false }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}