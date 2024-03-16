import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {User} from "@/lib/model/users";
import {NextResponse} from "next/server";
import {Mission} from "../../../lib/model/mission";
import {MissionCluster} from "../../../lib/model/missionCluster";

export async function GET() {


    var data = {}; // Declare data as an empty object
    try {
        await mongoose.connect(connectionStr);

        let clusterList = await MissionCluster.find({is_delete:0})

        const currentDate = new Date();

// Set the start date to the first day of the current month
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

// Set the end date to the last day of the current month
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);


        let mission =await await Mission.aggregate([
            {
                $match: {
                    created_at: {
                        $gte: startOfMonth,
                        $lte: endOfMonth
                    }
                }
            },
        ]);


        data = {
            clusterList:clusterList,
            mission:mission
        };

        return NextResponse.json({ result: data, success: true });
    } catch (error) {
        data = { success: false, message: error.message };
        return NextResponse.json(data); // Return the error response
    }

    // return NextResponse.json({result:data,success:true});
}