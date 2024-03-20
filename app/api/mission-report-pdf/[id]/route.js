import mongoose from "mongoose";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { connectionStr } from "../../../../lib/db";
import { Mission } from "../../../../lib/model/mission";
import { MissionDepartureArrival } from "../../../../lib/model/missionDepartureArrival";
import { MissionVehicle } from "../../../../lib/model/missionVehicle";

function convertDateFormat(dateString, newFormat) {
    // Parse the input date string
    let parsedDate = new Date(dateString);

    // Format the date according to the new format
    let formattedDate = parsedDate.toLocaleDateString(undefined, {dateStyle: 'medium'});

    return formattedDate;
}

function getStatusString(request_status) {
    return (
        request_status === "request_received" ? "Request Received" :
            request_status === "request_submitted_cla" ? "Request Submitted CLA" :
                request_status === "mission_completed" ? "Mission Completed" :
                    request_status === "request_cancelled_request" ? "Request Cancelled Request" :
                        request_status === "mission_postponed" ? "Mission Postponed" :
                            request_status === "mission_pending" ? "Mission Pending" :
                                request_status === "mission_aborted" ? "Mission Aborted" :
                                    "Unknown Status"
    );
}

function convertDateTimeFormat(dateString) {
    // Parse the input date string
    let parsedDate = new Date(dateString);

    // Format the date and time

    const options = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Use 24-hour format
    };

    // Format the date and time
    let formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(parsedDate);

    return formattedDateTime;
}

export async function GET(req, content) {
    try {
        const id = content.params.id;

        await mongoose.connect(connectionStr);
        let mission=await Mission.findOne({_id:id}).populate('mission_cluster').populate('agency.agency_id').populate({
            path: 'leader',
            populate: {
                path: 'user'
            }
        });
        let missionLocation = await MissionDepartureArrival.find({mission: id})
            .populate('departure_umrah_id')
            .populate('departure_premise_type')
            .populate('arrival_premise_type')
            .populate('arrival_umrah_id');

        let missionVehicle = await MissionVehicle.find({mission: id})
            .populate('staff.staff_id')
            .populate('vehicle')
            .populate('driver')
            .populate('agency');
        let data = {
            mission: mission,
            missionLocation: missionLocation,
            missionVehicle: missionVehicle,
        }

        let newDateFormat = "DD/MM/YYYY";



        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(
            ` <html><h1>Report Pdf</h1></html>`, {waitUntil: 'domcontentloaded'});
        const pdfBuffer = await page.pdf({
            format: 'A4',
            path: 'public/report.pdf',
            printBackground: true
        });

        // Close the browser to free up resources
        await browser.close();

        return NextResponse.json({result: 'success', success: true});
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error(error.message);
    }
}