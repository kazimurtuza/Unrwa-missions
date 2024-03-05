import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {Product} from "@/lib/model/product";
import {connectionStr} from "@/lib/db"
import {User} from "@/lib/model/users";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";

export async function PUT(request, content) {
    try {
        const userId = content.params.userid;
        const filter = { _id: userId };
        
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
        return NextResponse.json({ error, success: false });
    }

    return NextResponse.json({ success: true });
}


