import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db"
import {User} from "@/lib/model/users";
import { AuthUser } from "@/app/helper";

export async function PUT(request) {
    try {

        const user = await AuthUser();

       
        
        const filter = { _id: user.id };
        
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
        return NextResponse.json({ error:error.message, success: false });
    }

    return NextResponse.json({ msg:"Account Delete Successfully",success: true });
}


