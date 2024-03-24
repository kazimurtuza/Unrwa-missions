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
    let formattedDate = parsedDate.toLocaleDateString(undefined, {
        dateStyle: "medium",
    });

    return formattedDate;
}

function getStatusString(request_status) {
    return request_status === "request_received"
        ? "Request Received"
        : request_status === "request_submitted_cla"
        ? "Request Submitted CLA"
        : request_status === "mission_completed"
        ? "Mission Completed"
        : request_status === "request_cancelled_request"
        ? "Request Cancelled Request"
        : request_status === "mission_postponed"
        ? "Mission Postponed"
        : request_status === "mission_pending"
        ? "Mission Pending"
        : request_status === "mission_aborted"
        ? "Mission Aborted"
        : "Unknown Status";
}

function convertDateTimeFormat(dateString) {
    // Parse the input date string
    let parsedDate = new Date(dateString);

    // Format the date and time

    const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Use 24-hour format
    };

    // Format the date and time
    let formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
        parsedDate
    );

    return formattedDateTime;
}

export async function GET(req, content) {
    try {
        const id = content.params.id;

        await mongoose.connect(connectionStr);
        let mission = await Mission.findOne({ _id: id })
            .populate("mission_cluster")
            .populate("agency.agency_id")
            .populate({
                path: "leader",
                populate: {
                    path: "user",
                },
            });
        let missionLocation = await MissionDepartureArrival.find({
            mission: id,
        })
            .populate("departure_umrah_id")
            .populate("departure_premise_type")
            .populate("arrival_premise_type")
            .populate("arrival_umrah_id");

        let missionVehicle = await MissionVehicle.find({ mission: id })
            .populate("staff.staff_id")
            .populate("vehicle")
            .populate("driver")
            .populate("agency");
        // let data = {
        //     mission: mission,
        //     missionLocation: missionLocation,
        //     missionVehicle: missionVehicle,
        // };

        let newDateFormat = "DD/MM/YYYY";

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(
            ` <html>
            <style>
            :root{
                --global-font: "Open Sans", sans-serif;
                --line-border-fill:#1B7C85;
                --line-border-empty:#1B7C85;
                --main-color:#1B7C85;
            }

              .table-wrap {
                overflow-x: auto;
                width: 100%;
            }

            .mdf-form-head p{
                line-height: 2;
            }

            .table-wrap table div,
            .table-wrap table p{
                font-size: 13px;
            }

            .table-wrap table {
                table-layout: auto;
                width: 100%;
                padding-top: 20px;
                border-collapse: initial!important;
              }

              table thead tr {
                color: #2d3748;
                font-size: 14px;
                font-weight: 500;
                text-align: left;
              }

              table thead tr th {
                background: #cfe0f0;
                padding: 0.75rem 1.5rem;
                vertical-align: middle;
                font-size: 14px!important;
              }

              table tbody tr td {
                background: #cfe0f0;
              }

              table tbody td {
                color: #1a202c;
                text-align: left;
                vertical-align: middle;
                font-size: 12px;
                font-weight: normal;
                padding: 3px 10px;
              }

              .table-wrap p,
              .table-wrap div,
              .table-wrap th {
                font-size: 14px!important;
              }

              .table-wrap td span,
              table thead tr th span{
                font-size: 10px!important;
              }

              .table-wrap td span{
                display: block;
              }

              .input-wrap textarea,
              .input-wrap input{
                width: 100%;
                padding: 12px;
              }

              .table-wrap h3{
                font-size: 20px;
                font-weight: 700;
                margin-top: 40px;
              }

            .mdf-form-wrap h2{
                font-size: 22px;
            }

            </style>
            <body style="padding: 30px; font-family: arial; font-size: 13px;">

            <div className='msv-block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14 mdf-form-wrap'>
                                            <h2>Mission Debriefing Form</h2>

                                            <div className='mdf-form-body'>
                                                <div className='mdf-form-head'>
<!--                                                    <p>-->
<!--                                                        Convoy composition-->
<!--                                                        (Agencies): <span></span>-->

<!--                                                    </p>-->
                                                  <p>
    Mission Locations visited and route:
    ${missionLocation.map((item, index) =>
        `${item.departure_umrah_id != null ? item.departure_umrah_id.installation_name : item.departure_installation_name}- ${item.arrival_umrah_id != null ? item.arrival_umrah_id.installation_name : item.arrival_installation_name}`
    ).join(', ')}
</p>

                                                    <p>
                                                        Date of the mission:
                                                      ${mission &&
                                                            convertDateFormat(
                                                                mission.movement_date
                                                            )}
                                                    </p>
                                                    <p>
                                                        Mission Focal Point:
                                                        <span>${mission &&
                                                            mission.leader.name}</span>
                                                    </p>
                                                </div>
                                                <h3>
                                                    A Road Assessment (few bullet
                                                    points in relevant section)
                                                </h3>

                                                <div className='table-wrap'>
                                                    <table>
                                                        <thead>
                                                        <tr>
                                                            <th>
                                                                Road Condition
                                                            </th>
                                                            <th>
                                                                Include remarks
                                                                description next
                                                                to the relevant
                                                                cell under
                                                                column 'road
                                                                condition'
                                                                <span>
                                                                    (include
                                                                    stretch of
                                                                    the road,
                                                                    deviation,
                                                                    and
                                                                    additional
                                                                    relevant
                                                                    info)
                                                                </span>
                                                            </th>
                                                            <th>
                                                                Presence of EDs,
                                                                ERWs, and UXO
                                                                <span>
                                                                    (brief
                                                                    description
                                                                    and
                                                                    complement
                                                                    either with
                                                                    coordinates/picture/map
                                                                    in the next
                                                                    section)
                                                                </span>
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                A. Not Passable
                                                                <span>
                                                                    (e.g. Trucks
                                                                    and 4x4)
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <p>${mission.not_passable_road_condition}</p>

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <p>${mission.not_passable_presence_eds_erw_uxo}</p>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                B. Very bad
                                                                condition
                                                                <span>
                                                                    (e.g
                                                                    accessible
                                                                    with 4x4 but
                                                                    extremely
                                                                    difficult.
                                                                    Not
                                                                    accessible
                                                                    by Truck)
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>

                                                                <p>${mission.very_bad_road_condition}</p>

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <p>${mission.bad_presence_eds_erw_uxo}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                C. Bad condition
                                                                <span>
                                                                    (accessible
                                                                    with 4x4
                                                                    with some
                                                                    level of
                                                                    difficulties
                                                                    and Trucks
                                                                    below XX
                                                                    tonnage)
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <p>${mission.bad_road_condition}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <p>${mission.bad_presence_eds_erw_uxo}</p>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                D. Regular
                                                                condition
                                                                <span>
                                                                    (accessible
                                                                    by 2x4
                                                                    vehicles
                                                                    drive and
                                                                    Trucks XX
                                                                    tonnage)
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <p>${mission.regular_road_condition}</p>

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <p>${mission.regular_presence_eds_erw_uxo}</p>

                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>

                                                    <p>Please provide with maps and photographs below if possible</p>

                                                </div>

                                                <div className='table-wrap'>
                                                    <h3>Section B
                                                    </h3>
                                                    <table>
                                                        <thead>
                                                        <tr>
                                                            <th>
                                                                Insecurity or hostilities affecting humanitarian
                                                                assistance
                                                                <span>(report observation in military operation area, presence of check points, (without coordinates, or specific incidents that impacted the mission)</span>
                                                            </th>

                                                            <th>
                                                                Humanitarian Observations
                                                                <span>(i.e notable presence of IDPs, urgent needs or gaps in response etc)</span>
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>

                                                            <td>
                                                                <div className='input-wrap'>
                                                                <p>${mission.humanitarian_assistance}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <p>${mission.humanitarian_observations}</p>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                        </div>
            </body>

            </html>`,
            { waitUntil: "domcontentloaded" }
        );

        var name=`public/mission-pdf/${mission.mission_id}_report.pdf`
        const pdfBuffer = await page.pdf({
            format: "A4",
            path:name,
            printBackground: true,

        });

        // Close the browser to free up resources
        await browser.close();

        return NextResponse.json({ result: "success", success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error(error.message);
    }
}
