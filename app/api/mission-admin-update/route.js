import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Mission} from "@/lib/model/mission";
import {MissionDepartureArrival} from "@/lib/model/missionDepartureArrival";
import {MissionVehicle} from "@/lib/model/missionVehicle";
import nodemailer from "nodemailer";

function getCurrentFormattedDate() {
    const currentDate = new Date(); // Get the current date
    const year = currentDate.getFullYear(); // Get the current year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (adding 1 because months are zero-based) and pad with leading zero if necessary
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day and pad with leading zero if necessary

    return `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD" and return
}

export async function POST(request) {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(connectionStr);

        // Parse the request payload
        let payload = await request.json();
        const info = payload; // No need for await here

        const filter = {_id: info.mission_id};
        const update = info;
        if (info.request_status == "mission_completed") {
            info.completed_date = getCurrentFormattedDate()
        }
        if (info.cla_decision == "approved") {
            info.approved_date = getCurrentFormattedDate()
        }
        if (info.cla_decision == "approved") {
            info.rejected_date = getCurrentFormattedDate()
        }

        // Perform the update operation using findOneAndUpdate
        const missionUpdate = await Mission.findOneAndUpdate(filter, update, {new: true});

        if (missionUpdate) {
            // Return the updated mission if found
            return NextResponse.json({mission: missionUpdate, success: true});
        } else {
            // Return error message if mission is not found
            return NextResponse.json({success: false, message: 'Mission not found'});
        }
    } catch (error) {
        // Handle any errors that occur during the process
        return NextResponse.json({error: error.message, success: false});
    }
}