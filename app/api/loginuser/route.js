import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {User} from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import jwt from "jsonwebtoken";
import {headers} from "next/headers";


export async function GET(){
    const headerdata=headers();
    const bearerToken = headerdata.get("authorization");
    const token = bearerToken.split(' ')[1];
    let info=jwt.decode(token);


    return NextResponse.json(info);


}
