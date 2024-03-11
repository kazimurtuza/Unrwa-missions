import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import jwt from "jsonwebtoken";
import { AuthUser } from "@/app/helper";
import { User } from "@/lib/model/users";
import bcrypt from 'bcrypt';


export async function PUT(request) {
    try {
        var result;
        let msg;
        await mongoose.connect(connectionStr);
        const { email, password,code } = await request.json();
        let user = await User.find({ email: email });

        if (user) {
            const filter = { email: email };
            const update={};
            let prev_code=user[0].reset_password_code;
            
            // if(prev_code == code)
            // {
                if(password)
                {
                    const hashPassword = await bcrypt.hash(password, 10);
                    update.password=hashPassword;
                    update.reset_password_code=null;
                    
                    await User.findOneAndUpdate(filter, update);
                    result = "Reset Password Succcuessfully";
                    
                }
                else
                {
                    msg="Password is required";
                    return NextResponse.json({ msg, success: false });
                }
                 
                
            // }
            // else
            // {
            //     msg="Invalid Code.";
            //     return NextResponse.json({ msg, success: false });
            // }
           
           
        } else {
            result = "No user found";
            msg="No user found";
            return NextResponse.json({ msg, success: false });
        }

        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error, success: false });
    }
}