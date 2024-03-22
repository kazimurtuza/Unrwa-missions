import {NextResponse} from "next/server";
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import {User} from "@/lib/model/users";
import {connectionStr} from "@/lib/db";
import validator from 'validator';
import jwt from "jsonwebtoken"

export async function POST(request) {

    var result = [];
    try {
        const {name, email, phone, password, user_type} = await (request.json());
        if (!name || !email || !password || !user_type) {
            return NextResponse.json({msg: 'invalid fields'}, {status: 400});
        }
        const errors = {};

        if (!validator.isEmail(email)) {
            return new NextResponse(JSON.stringify({ msg: 'Invalid email address' }), { status: 400 });
        }
        await mongoose.connect(connectionStr);

        const record = {email: email};
        const is_findEmail = await User.findOne(record);
        if (is_findEmail) {
            return NextResponse.json({msg: 'user is already present'}, {status: 409});
        } else {
            const hashPassword = await bcrypt.hash(password, 10);
            let storeData = {
                'name': name,
                'email': email,
                'password': hashPassword,
                'user_type': user_type,
                'phone': phone
            };
            let user = new User(storeData);
            let userinfo = await user.save();
            let id = userinfo._id;
            const srcky=process.env.JWT_SECRET
            result = jwt.sign({name, email,id}, srcky);
            return NextResponse.json({userinfo, 'token': result}, {status: 200});
        }
    } catch (error) {
        return NextResponse.json(error);
    }
    return NextResponse.json(result);
}



