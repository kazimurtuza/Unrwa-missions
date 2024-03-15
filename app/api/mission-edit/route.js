import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Mission} from "@/lib/model/mission";
import {MissionDepartureArrival} from "@/lib/model/missionDepartureArrival";
import {MissionVehicle} from "@/lib/model/missionVehicle";
import nodemailer from "nodemailer";


export async function POST(request) {
    try {

        const transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
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
        const mailOptions = {};


        var result;
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        const location_list = await payload.location_list;
        const vehicle_list = await payload.vehicle_list;
        const mission = payload;
        delete mission.location_list;
        delete mission.vehicle_list;
        // return NextResponse.json({mission, success: true});

        let missionId=payload._id;

        const filter = {_id: missionId};
        const update = mission;
        // Perform the update operation using findOneAndUpdate
        const missionUpdate = await Mission.findOneAndUpdate(filter, update, {new: true});

        if (location_list.length > 0) {
            location_list.map(async (item, index) => {
                item.mission = await missionId;
                if(item._id){
                    const filter = {_id: item._id};
                    const update = item;
                    const missionLocation = await MissionDepartureArrival.findOneAndUpdate(filter, update, {new: true});
                }else{
                    const missionLocation = await new MissionDepartureArrival(item);
                    missionLocation.save();
                }

            })
        }
        if (vehicle_list.length > 0) {
            vehicle_list.map(async (item, index) => {
                item.mission = await missionId;
                if(item._id){
                    const filter = {_id: item._id};
                    const update = item;
                    const missionVehicle = await MissionVehicle.findOneAndUpdate(filter, update, {new: true});
                }else{
                    const missionVehicle = await new MissionVehicle(item);
                    missionVehicle.save();
                }
            })
        }

        const mailContent = `New Mission Created `;
        // Set up email options
        // let user=User.findOne({user_type:'admin'}).email;
        if (0) {
            mailOptions.to = 'kazimurtuza11@gmail.com';
            mailOptions.subject = "UNRWA New Mission Created";
            mailOptions.text = mailContent;
            // Send the email
            await transporter.sendMail(mailOptions);
        }
        result = "success";

        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }
}