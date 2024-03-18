import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Vehicle } from "@/lib/model/vehicle";
import { User } from "@/lib/model/users";
import { connectionStr } from "@/lib/db";
import bcrypt from 'bcrypt';
import validator from 'validator';
import { Agency } from "@/lib/model/agency";

export async function GET(){
 
    let data=[];
    try{
        console.log(connectionStr);
        await mongoose.connect(connectionStr);
        data = await Vehicle.find({ is_delete: 0 })
        .sort({ created_at: -1 })
        .populate({
            path: "agency",
            model: "Agency"
        });
    }
    catch(error)
    {
        data={success:false,error:error.message};
    }

    return NextResponse.json({result:data,success:true});
}
export async function POST(request) {
    try {
        const payload = await request.json();

        await mongoose.connect(connectionStr);

        const record = {vehicle_id: payload.vehicle_id,is_delete:0};
        const is_findEmail = await Vehicle.findOne(record);
        if (is_findEmail) {
            return NextResponse.json({msg: 'Vehicle ID is already present',success:false}, {status: 409});
        }

        const record2 = {vehicle_plate_number: payload.vehicle_plate_number,is_delete:0};
        const is_findEmail2 = await Vehicle.findOne(record2);
        if (is_findEmail2) {
            return NextResponse.json({msg: 'Vehicle Plate Number is already present',success:false}, {status: 409});
        }


        //vehicle create
        let vehicle = new Vehicle(payload);
        let result = await vehicle.save();
        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ error: error.message, success: false }, { status: 500 });
    } finally {
        await mongoose.disconnect();
    }
}