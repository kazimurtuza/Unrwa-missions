import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectionStr } from "@/lib/db";
import jwt from "jsonwebtoken";
import { AuthUser } from "@/app/helper";
import { uploadBase64Img } from "@/app/helper";
import {headers} from "next/headers";
import { User } from "@/lib/model/users";

export async function GET(){

    let result=[];

    try{   
        console.log(connectionStr);
        const userInfo = await AuthUser();
        await mongoose.connect(connectionStr);

        result = await User.findById({_id:userInfo.id});     
    }
    catch(error)
    {
        result=error.message;
    }
    return NextResponse.json(result, {status: 200});

}

export async function PUT(request) {
    try {
        var result;
        await mongoose.connect(connectionStr);
        const userInfo = await AuthUser();
        const { name, phone, image } = await request.json();
        let user = await User.find({ _id: userInfo.id });

        if (user) {
            const filter = { _id: userInfo.id };
            const update={};
            if(name)
            {
                update.name=name;
            }
            if(phone)
            {        
                update.phone=phone;
            }
            if(image)
            {        
                let UpdateImage=await uploadBase64Img(image);
                update.img=UpdateImage;
            }
           
          
            result=await User.findOneAndUpdate(filter, update);
            result=await User.find({ _id: userInfo.id});
        } else {
            result = "No user found";
            msg="No user found";
            return NextResponse.json({ msg, success: false });
        }

        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error:error.message, success: true });
    }
}