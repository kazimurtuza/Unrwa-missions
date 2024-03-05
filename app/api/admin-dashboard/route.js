import mongoose from "mongoose";
import {Category} from "@/lib/model/category";
import {connectionStr} from "@/lib/db";
import {User} from "@/lib/model/users";
import {NextResponse} from "next/server";
import {Product} from "@/lib/model/product";
import {Order} from "@/lib/model/order";

export async function GET() {


    var data = {}; // Declare data as an empty object
    try {
        await mongoose.connect(connectionStr);
        let userList = await User.countDocuments();
        let productList = await Product.countDocuments();
        let orderList = await Order.countDocuments();
        let completeOrderList = await Order.countDocuments({ order_status: 3 });

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