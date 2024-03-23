import { connectionStr } from "@/lib/db";
import { Mission } from "@/lib/model/mission";
import { MissionDepartureArrival } from "@/lib/model/missionDepartureArrival";
import { MissionVehicle } from "@/lib/model/missionVehicle";
import { AppSetting } from "@/lib/model/setting";
import ejs from "ejs";
import fs from "fs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

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

        const filter = {_id: info.m_id};
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

        let missionId = info.m_id
        let mission_info = await Mission.findOne({_id: missionId}).populate('mission_classification_info').populate('mission_cluster').populate('unops_acu_status').populate('agency.agency_id').populate({
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
        // ----------Email----------------
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: 465,
            secure: true, // Set to false for explicit TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                // Do not fail on invalid certificates
                //rejectUnauthorized: false,
            },
        });

        const emailTemplatePath = path.resolve("./app/emails/mission_creation.ejs");
        const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
        const mailContent = ejs.render(emailTemplate, {
            mission: mission_info,
            missionLocation_info: missionLocation_info,
            missionVehicle_info: missionVehicle_info,
        });
        var agencies = await Promise.all(mission_info.agency.map(async (item) => {
            return `${item.agency_id.name}`;
        }));

        var setting=await AppSetting.findOne();
        // setting.to
        // setting.cla

        var sendto=await mission_info.leader.user.email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: setting.cla,
            // to: 'kazimurtuza11@gmail.com',
            // to: sendto,
            subject: "MR " + mission_info.mission_id + " MNR Agencies " + agencies.join(''),
            html: mailContent,
        };

        if (payload.request_status == "request_submitted_cla") {
            await transporter.sendMail(mailOptions);
        }

        // ----------Email----------------

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