import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Faq} from "@/lib/model/faq";

export async function DELETE(request, content) {
    try {
        await mongoose.connect(connectionStr);
        const id = content.params.id;
        let deleteInfo = await Faq.deleteOne({'_id':id});
        return NextResponse.json({deleteInfo, success: true});
    } catch (error) {
        return NextResponse.json({error, success: true});
    }
}