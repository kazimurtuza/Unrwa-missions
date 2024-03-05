import {NextResponse} from "next/server";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import {User} from "@/lib/model/users";
import {connectionStr} from "@/lib/db";
import jwt from "jsonwebtoken"

export async function POST(request) {
    try {
        const {name, email, password, user_type} = await (request.json());

        if (!email || !password || !user_type) {
            return NextResponse.json({msg: 'invalid fields'}, {status: 400});
        }
        await mongoose.connect(connectionStr);
        const srcky=process.env.JWT_SECRET
        const record = {email: email};
        const user = await User.findOne(record);
        if (user) {
            let id = user.id;
            let is_user = await bcrypt.compare(password, user.password);
            if (is_user) {
                // let token = jwt.sign({name, email, id,user_type}, srcky,{ expiresIn: '1h' });
                let token = jwt.sign({name, email, id,user_type}, srcky);
                return NextResponse.json({user, 'token': token}, {status: 200});
            }
        }
    } catch (error) {
        return NextResponse.json(error);
    }
    return NextResponse.json({'msg': 'Email or Password is incorrect'}, {status: 401});
}



