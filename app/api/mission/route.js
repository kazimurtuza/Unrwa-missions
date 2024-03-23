import mongoose from "mongoose";
import {connectionStr} from "@/lib/db";
import {NextResponse} from "next/server";
import {Mission} from "@/lib/model/mission";
import {MissionDepartureArrival} from "@/lib/model/missionDepartureArrival";
import {MissionVehicle} from "@/lib/model/missionVehicle";
import nodemailer from "nodemailer";
import {AuthUser} from "@/app/helper";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import {User} from "@/lib/model/users";
import {Staff} from "@/lib/model/staff";
import {AppSetting} from "@/lib/model/setting";
// import axiosClient from "@/app/axiosClient";
// import {useState} from "react";

function getCurrentFormattedDate() {
    const currentDate = new Date(); // Get the current date
    const year = currentDate.getFullYear(); // Get the current year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (adding 1 because months are zero-based) and pad with leading zero if necessary
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day and pad with leading zero if necessary

    return `${year}-${month}-${day}`; // Format the date as "YYYY-MM-DD" and return
}

export async function POST(request) {
    try {

        // const transporter = await nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 465,
        //     secure: true, // Set to false for explicit TLS
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASSWORD,
        //     },
        //     tls: {
        //         // Do not fail on invalid certificates
        //         //rejectUnauthorized: false,
        //     },
        // });


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




        // const mailOptions={};

        var result;
        await mongoose.connect(connectionStr);
        let payload = await request.json();
        const location_list = await payload.location_list;
        const vehicle_list = await payload.vehicle_list;
        var mission = payload;
        delete mission.location_list;
        delete mission.vehicle_list;
        var totalMission = await Mission.countDocuments()+1;
        var totalMissionNo = String(totalMission).padStart(6, '0').slice(0, 6);
        var no=await `UNRWA${totalMissionNo}`;
        mission.create_date = await getCurrentFormattedDate();
        mission.mission_id = no;
        // return NextResponse.json({mission, success: true});
        const missionAdd = await new Mission(mission);
        missionAdd.save();
        result = missionAdd;
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


        //const mailContent = `New Mission Created `;
        // Set up email options
        // let user=User.findOne({user_type:'admin'}).email;
        if (1) {
            // mailOptions.to = 'lipan@technovicinity.com';
            // mailOptions.subject = "UNRWA New Mission Created";
            // mailOptions.text = mailContent;
            const leaderInfo = await Staff.findOne({_id: mission.leader});
            // const emailTemplatePath = path.resolve("./app/emails/mission_creation.ejs");
            const emailTemplatePath = path.resolve("./app/emails/mission-admin-mail.ejs");
            const emailFocalData = path.resolve("./app/emails/focal-point-mission.ejs");
            const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
            const emailfocalTemplate = fs.readFileSync(emailFocalData, "utf-8");

            // mail data
            let mission_info = await Mission.findOne({_id: missionId}).populate('mission_cluster').populate('agency.agency_id').populate({
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
            // mail data


            const mailContent = ejs.render(emailTemplate, {
                   mission:mission_info,
                   missionLocation_info:missionLocation_info,
            });
            const focalContent = ejs.render(emailfocalTemplate, {
                   mission:mission_info,
                   missionLocation_info:missionLocation_info,
            });


            // const mailOptions = {
            //     from: process.env.EMAIL_USER,
            //     // to: 'lipan@technovicinity.com',
            //     to: 'kazimurtuza11@gmail.com',
            //     //to: 'sajeebchakraborty.cse2000@gmail.com',
            //     //   to: 'mailto:anjumsakib@gmail.com',
            //     subject: "MR " + mission.mission_id + " Received (Submission Date " + mission.create_date + ")",
            //     html: mailContent,
            // };

            let userData=await AuthUser();
            var userEmail=userData.email;


            var setting=await AppSetting.findOne();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: setting.to,
                subject: "MR " + mission.mission_id + " Received (Submission Date " + mission.create_date + ")",
                html: mailContent,
            };

            var sendto=await mission_info.leader.user.email
            const focalOptions = {
                from: process.env.EMAIL_USER,
                to:sendto,
                subject: "MR " + mission.mission_id + " Received (Submission Date " + mission.create_date + ")",
                html: focalContent,
            };

            // Send the email
            if(userEmail){
                await transporter.sendMail(mailOptions);
            }
            await transporter.sendMail(focalOptions);
        }


        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }
}


export async function GET() {
    try {
        await mongoose.connect(connectionStr);


        let userInfo = await AuthUser()
        let user_type = userInfo.user_type;
        let user_id = await userInfo.staff_id;

        if (user_type === "admin") {
            var result = await Mission.aggregate([
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
                        from: "missionclusters",
                        localField: "mission_cluster",
                        foreignField: "_id",
                        as: "cluster"
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
                },
                {
                    $sort: { /* Specify the field to sort by and set it to -1 for descending order */
                        _id: -1
                    }
                }
            ]) // Adjust this line
                .exec();
        } else {
            var id = new mongoose.Types.ObjectId(user_id)
            var result = await Mission.aggregate([
                {
                    $match: {
                        leader: id// Match documents where the leader field matches the given leader ID
                    }
                },
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
                        from: "missionclusters",
                        localField: "mission_cluster",
                        foreignField: "_id",
                        as: "cluster"
                    }
                },
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
                },
                {
                    $sort: { /* Specify the field to sort by and set it to -1 for descending order */
                        _id: -1
                    }
                }
            ]) // Adjust this line
                .exec();
        }

        return NextResponse.json({result, success: true});
    } catch (error) {
        return NextResponse.json({error: error.message, success: false});
    }

}