import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {User} from "@/lib/model/users";
import {NextResponse} from "next/server";
import {Mission} from "../../../lib/model/mission";
import {MissionCluster} from "../../../lib/model/missionCluster";
import {AuthUser} from "@/app/helper";

function getCurrentFormattedDate() {
    const currentDate = new Date(); // Get the current date
    const year = currentDate.getFullYear(); // Get the current year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (adding 1 because months are zero-based) and pad with leading zero if necessary
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day and pad with leading zero if necessary

    return `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD" and return
}

export async function GET() {

    var data = {}; // Declare data as an empty object
    try {
        await mongoose.connect(connectionStr);
        // let currentDate = await new Date().toJSON().slice(0, 10);
        let currentDate = await getCurrentFormattedDate();
        let userInfo = await AuthUser();
        let user_type = userInfo.user_type;
        let user_id = await userInfo.staff_id;
        try {
            if (user_type === "admin") {
                var totalMission = await Mission.countDocuments();
                var completed = await Mission.countDocuments({request_status: "mission_completed"});
                var rejectCount = await Mission.countDocuments({cla_decision: "denied"});
                var approved = await Mission.countDocuments({cla_decision: "approved"});
                var clusterList = await MissionCluster.find({is_delete: 0});
                var completedToday = await Mission.countDocuments({
                    request_status: "mission_completed",
                    completed_date: currentDate
                });
                var rejectCountToday = await Mission.countDocuments({cla_decision: "denied", rejected_date: currentDate});
                var approvedToday = await Mission.countDocuments({cla_decision: "approved", approved_date: currentDate});
                var totalMissionToday = await Mission.countDocuments({create_date: currentDate});
            } else {
                var totalMission = await Mission.countDocuments({ leader: user_id });
                var completed = await Mission.countDocuments({leader: user_id, request_status: "mission_completed"});
                var rejectCount = await Mission.countDocuments({leader: user_id, cla_decision: "denied"});
                var approved = await Mission.countDocuments({leader: user_id, cla_decision: "approved"});
                var clusterList = await MissionCluster.find({is_delete: 0});

                var completedToday = await Mission.countDocuments({
                    leader: user_id,
                    request_status: "mission_completed",
                    completed_date: currentDate
                });
                var rejectCountToday = await Mission.countDocuments({
                    leader: user_id,
                    cla_decision: "denied",
                    rejected_date: currentDate
                });
                var approvedToday = await Mission.countDocuments({
                    leader: user_id,
                    cla_decision: "approved",
                    approved_date: currentDate
                });
                var totalMissionToday = await Mission.countDocuments({leader: user_id, create_date: currentDate});
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error appropriately
        }
        data = await {
            totalMission: totalMission,
            completed: completed,
            approved: approved,
            rejectCount: rejectCount,
            clusterList: clusterList,
            completedToday: completedToday,
            rejectCountToday: rejectCountToday,
            approvedToday: approvedToday,
            totalMissionToday: totalMissionToday,
        };
        return NextResponse.json({result: data, success: true});
    } catch (error) {
        data = {success: false, message: error.message};
        return NextResponse.json(data); // Return the error response
    }

    // return NextResponse.json({result:data,success:true});
}