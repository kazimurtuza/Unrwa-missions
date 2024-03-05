import { NextResponse } from "next/server";
import mongoose from "mongoose";
import {Order} from "@/lib/model/order";
import { connectionStr } from "@/lib/db";
import {AuthUser} from "@/app/helper";
import {ChatList} from "@/lib/model/chatList";
export async function GET(request, content)
{
    var result;
    try{
        const productId = await content.params.product_id;
        await mongoose.connect(connectionStr);
        const productOrderList = await Order.find({
            'product_id': productId,
        });
        return NextResponse.json({productOrderList,success:true});
    }
    catch(error)
    {
        return NextResponse.json(error);
    }
    return NextResponse.json({productOrderList,success:true});
}