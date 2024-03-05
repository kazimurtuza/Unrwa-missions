import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {ChatList} from "@/lib/model/chatList";
import {AuthUser} from "@/app/helper";

export async function GET(request, content) {
    try {
        const roomId = await content.params.room_id;
        let userIndo = await AuthUser();
        let userId = userIndo.id;
        await mongoose.connect(connectionStr);
        const chatList = await ChatList.find({
            'room_id': roomId,
        });
        await ChatList.updateMany({"receiver_id": userId, "room_id": roomId},
            {$set: {"is_seen": true}});

        return NextResponse.json({chatList, success: false})
    } catch (error) {
       return  NextResponse.json({error, success: false})

    }

}