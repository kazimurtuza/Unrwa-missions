import {NextResponse} from "next/server";
import mongoose from "mongoose";
import {connectionStr} from "@/lib/db"
import {User} from "@/lib/model/users";
import { AuthUser } from "@/app/helper";
import { MissionDepartureArrival } from "@/lib/model/missionDepartureArrival";

export async function PUT(request,content) {
    try {
 
        const id = content.params.id;
        const filter = { _id: id };

        const payload = await request.json();
        
        await mongoose.connect(connectionStr);
        const path = await MissionDepartureArrival.findById(filter);


        if (!path) {
            return NextResponse.json({ error: 'Path not found', success: false });
        }

        if(payload.type=="Check In")
        {
            path.checkin_status=1;
        }
        else if(payload.type=="Check Out")
        {
            path.checkout_status=1;
        }

        const result = await path.save();
    } catch (error) {
        return NextResponse.json({ error:error.message, success: false });
    }

    return NextResponse.json({ msg:"Status Updated Successfully",success: true });
}


