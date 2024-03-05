import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {User} from "@/lib/model/users";
import {NextResponse} from "next/server";

export async function GET() {


    var data = {}; // Declare data as an empty object
    try {
        await mongoose.connect(connectionStr);
        let userList = 0;
        let productList = 0;
        let orderList = 0;
        let completeOrderList = 0;

        data = {
            userList: userList,
            productList: productList,
            orderList: orderList,
            completeOrderList: completeOrderList
        };

        return NextResponse.json({ result: data, success: true });
    } catch (error) {
        data = { success: false, message: error.message };
        return NextResponse.json(data); // Return the error response
    }

    // return NextResponse.json({result:data,success:true});
}