import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Staff } from "@/lib/model/staff";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';

export async function GET(){
 
    let data=[];
    try{
        console.log(connectionStr);
        await mongoose.connect(connectionStr);
        data = await Staff
        .find({is_delete:0})
        .populate({
            path: 'user',
            model: 'User'
        })
        .sort({ created_at: -1 })
        .exec();
    }
    catch(error)
    {
        data={success:false,error:error.message};
    }

    return NextResponse.json({result:data,success:true});
}
export async function POST(request) {
    try {
        const payload = await request.json();
        if (!validator.isEmail(payload.email)) {
            return new NextResponse(JSON.stringify({ msg: 'Invalid email address',success:false }), { status: 400 });
        }
        await mongoose.connect(connectionStr);

        const record = {email: payload.email};
        const is_findEmail = await User.findOne(record);
        if (is_findEmail) {
            return NextResponse.json({msg: 'user is already present',success:false}, {status: 409});
        }
        await mongoose.connect(connectionStr);
        //password hashing
        const hashPassword = await bcrypt.hash(payload.password, 10);
        let storeUser = {
                'name': payload.name,
                'email': payload.email,
                'password': hashPassword,
                'user_type': 'staff',
                "phone": payload.whatsup_number
        };
        //user create
        let user = new User(storeUser);
        let result=await user.save();

        //staff create
        payload.user=user._id;
        let staff = new Staff(payload);
        result = await staff.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}