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
        const mailOptions={};



        var result;
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        const location_list = await payload.location_list;
        const vehicle_list = await payload.vehicle_list;
        const mission = payload;
        delete mission.location_list;
        delete mission.vehicle_list;
        mission.create_date= await getCurrentFormattedDate();
        // return NextResponse.json({mission, success: true});
        const missionAdd = await new Mission(mission);
        missionAdd.save();
        result=missionAdd;
        const missionId = await missionAdd._id;

        if (location_list.length > 0) {
            location_list.map(async (item, index) => {
                item.mission = await missionId;
                const missionLocation = await new MissionDepartureArrival(item);
                 missionLocation.save();
            })
        }
        if (vehicle_list.length > 0) {
            vehicle_list.map(async (item, index) => {
                item.mission = await missionId;
                const missionVehicle = await new MissionVehicle(item);
                missionVehicle.save();
            })
        }


        const mailContent = `New Mission Created `;
        // Set up email options
        // let user=User.findOne({user_type:'admin'}).email;
        if(1){
            mailOptions.to = 'kazimurtuza11@gmail.com';
            mailOptions.subject = "UNRWA New Mission Created";
            mailOptions.text = mailContent;
            // Send the email
            await transporter.sendMail(mailOptions);
        }





        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }
}

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        let result = await Mission.aggregate([
            {
                $lookup: {
                    from: "staffs",
                    localField: "leader",
                    foreignField: "_id",
                    as: "leader_details"
                }
            },
            {
                $lookup: {
                    from: "missionvehicles",
                    localField: "_id",
                    foreignField: "mission",
                    as: "vehicle_list"
                }
            }
            ,
            {
                $lookup: {
                    from: "vehicles", // Collection to join with
                    localField: "vehicle_list.vehicle", // Field from the "missionvehicles" array
                    foreignField: "_id", // Field from the "vehicles" collection
                    as: "vehicle_details" // Output array field where joined documents will be stored
                }
            },

            {
                $lookup: {
                    from: "staffs",
                    localField: "vehicle_list.staff.staff_id",
                    foreignField: "_id",
                    as: "staff_details"
                }
            },
            {
                $lookup: {
                    from: "missiondeparturearrivallists",
                    localField: "_id",
                    foreignField: "mission",
                    as: "depature_arrival_details"
                }
            }
        ]) // Adjust this line
            .exec();

        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }

}