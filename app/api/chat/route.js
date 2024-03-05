import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {Order} from "@/lib/model/order";
import {connectionStr} from "@/lib/db";
import {ChatRoom} from "@/lib/model/chatRoom";
import {ChatList} from "@/lib/model/chatList";
import {AuthUser, uploadBase64Img} from "@/app/helper";

export async function POST(request) {
    var result;
    try {
        const userInfo=await AuthUser();
        const userId=userInfo.id;
        const payload = await (request.json());
        var text = payload.text;
        var image = payload.image || [];
        var location = payload.location;
        var buyerId = payload.buyer_id;
        var sellerId = payload.seller_id;
        var productId = payload.product_id;
        var senderId = userId;
        var receiverId = payload.receiver_id;
        var chatRoom;
        var room_id;
        await mongoose.connect(connectionStr);

        if (!payload.room_id) {
            chatRoom = await ChatRoom.findOne({
                "product_id": productId,
                "buyer_id": buyerId,
                "seller_id": sellerId,
            });
            if (!chatRoom) {
                let roomObj = {
                    "product_id": productId,
                    "buyer_id": buyerId,
                    "seller_id": sellerId,
                }
                let room = new ChatRoom(roomObj);
                let roomInfo = await room.save();
                room_id = roomInfo._id;
            } else {
                room_id = await chatRoom._id;
            }
        } else {
            room_id = payload.room_id;
        }

        if (text || image.length > 0 || location) {
            var imgPathList=[];
            if (payload.new_images) {
                for (const newImg of payload.new_images) {
                    let imagePath = await uploadBase64Img(newImg);
                    imgPathList.push(imagePath)
                }
            }
            if (image.length > 0) {
                for (const img of image) {
                    let imgPath = await uploadBase64Img(img);
                    imgPathList.push(imgPath);
                }
            }
            var messageObj = {
                "room_id": room_id,
                "sender_id": senderId,
                "receiver_id": receiverId,
                "text": text,
                "image": imgPathList,
                "location": location,
            }

            let message = await new ChatList(messageObj)
            let info = await message.save();
            result = info;
        }
    } catch (error) {
        return NextResponse.json({error, success: false}, {status: 201});
    }
    return NextResponse.json({result, success: true}, {status: 201});

}