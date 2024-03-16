import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {User} from "@/lib/model/users";
import {NextResponse} from "next/server";
import {Mission} from "../../../lib/model/mission";

export async function GET() {


    var data = {}; // Declare data as an empty object
    try {
        await mongoose.connect(connectionStr);



        let totalMission = await Mission.countDocuments();
        let completed = await Mission.countDocuments({ request_status: "mission_completed" });
        let rejectCount = await Mission.countDocuments({ cla_decision: "denied" });
        let approved = await Mission.countDocuments({ cla_decision: "approved" });
        // let clusterList = await MissionCluster.find({is_delete:0});



        data = {
            totalMission: totalMission,
            completed: completed,
            approved: approved,
            rejectCount: rejectCount,
        };

        return NextResponse.json({ result: data, success: true });
    } catch (error) {
        data = { success: false, message: error.message };
        return NextResponse.json(data); // Return the error response
    }

    // return NextResponse.json({result:data,success:true});
}