import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Mission} from "@/lib/model/mission";
import {MissionDepartureArrival} from "@/lib/model/missionDepartureArrival";
import {MissionVehicle} from "@/lib/model/missionVehicle";
import nodemailer from "nodemailer";
import {uploadBase64Img} from "../../helper";
import fs from "fs";
import ejs from "ejs";
import path from "path";

function getCurrentFormattedDate() {
    const currentDate = new Date(); // Get the current date
    const year = currentDate.getFullYear(); // Get the current year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (adding 1 because months are zero-based) and pad with leading zero if necessary
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day and pad with leading zero if necessary

    return `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD" and return
}

function isBase64(str) {
    // Regular expression to match the base64 pattern
    const base64Regex = /^(data:image\/[a-zA-Z]*;base64,)/;
    return base64Regex.test(str);
}

export async function POST(request) {
    try {
        // Connect to the MongoDB database
        await mongoose.connect(connectionStr);

        // Parse the request payload
        let payload = await request.json();
        var info = payload; // No need for await here

        const filter = {_id: info.m_id};
        const update = info;
        const imageList=info.report_image_list;
        const newimglist = imageList.filter(item => item !== "");
        var imgList = [];
        if (newimglist.length > 0) {
            imgList = await Promise.all(newimglist.map(async (item) => {
                if (isBase64(item)) {
                    return await uploadBase64Img(item);
                } else {
                    return item; // Return the item unchanged if it's not a base64 string
                }
            }));
        }
        if(imgList.length>0){
            info={...info,report_image_list:imgList}
        }

        // return NextResponse.json({success: info, message: 'Mission notdd found'});

        // Perform the update operation using findOneAndUpdate
        const missionUpdate = await Mission.findOneAndUpdate(filter, info, {new: true});

        //email data
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true, // Set to false for explicit TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
            },
        });
        let missionId = info.m_id
        let mission_info = await Mission.findOne({_id: missionId}).populate('mission_cluster').populate('mission_classification_info').populate('unops_acu_status').populate('agency.agency_id').populate({
            path: 'leader',
            populate: {
                path: 'user'
            }
        });
        let missionLocation_info = await MissionDepartureArrival.find({mission: missionId})
            .populate('departure_umrah_id')
            .populate('departure_premise_type')
            .populate('arrival_premise_type')
            .populate('arrival_umrah_id')


        let missionVehicle_info = await MissionVehicle.find({mission: missionId})
            .populate('staff.staff_id')
            .populate('vehicle')
            .populate('driver')
            .populate('agency');

        const emailTemplatePath = path.resolve("./app/emails/debriefing-mission.ejs");
        const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
        const mailContent = ejs.render(emailTemplate, {
            mission: mission_info,
            missionLocation_info: missionLocation_info,
            missionVehicle_info: missionVehicle_info,
        });
        var agencies = await Promise.all(mission_info.agency.map(async (item) => {
            return `${item.agency_id.name}`;
        }));

        var sendto=await mission_info.leader.user.email

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: sendto,
            subject: "MR #" + mission_info.mission_id + " CLA Decision on your MCR or MNR",
            // subject: "MR " + mission_info.mission_id + " MNR Agencies " + agencies.join(''),
            html: mailContent,
        };

        await transporter.sendMail(mailOptions);
        //email data

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