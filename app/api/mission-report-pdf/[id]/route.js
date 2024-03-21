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
        let data = {
            mission: mission,
            missionLocation: missionLocation,
            missionVehicle: missionVehicle,
        };

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

            a {
                text-decoration: none;
                transition: 0.3s;
              }

            .flex-ctr-spb {
                display: flex;
                align-items: center;
                justify-content: space-between;
              }

              .flex-start-spb {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                /* background-color: rgba(0, 0, 0, .2); */
              }

            /********************************
            *	       Dashboard              *
            ********************************/
            /******* Dashboard Form ********/
            .dashboard__form {
                background-color: var(--light-color);
                border-radius: 8px;
                padding: 24px;
              }

              .form__title {
                font-size: 18px;
                line-height: 1.3;
                font-weight: 600;
                color: var(--black-color);
                font-family: var(--global-font);
                margin: 0;
              }

              .form__fields {
                margin: 20px 0 0;
              }

              .form__row {
                gap: 16px;
                margin-bottom: 20px;
              }

              .form__row:last-child {
                margin: 0;
              }

              .form__field {
                margin-bottom: 25px;
              }

              .form__label {
                font-size: 14px;
                line-height: 1.2;
                font-weight: 500;
                font-family: var(--global-font);
                color: var(--black-color);
                margin: 0 0 8px;
                display: inline-block;
              }

              .form__select,
              .form__input,
              .form__textarea {
                font-size: 14px;
                line-height: 1.2;
                font-weight: 400;
                color: var(--black-color);
                width: 100%;
                padding: 10px 12px;
                border-radius: 4px;
                border: 1px solid rgba(0, 0, 0, 0.2);
              }

              .form__textarea {
                height: 115px;
                resize: vertical;
              }

              .form__info-box {
                border-radius: 5px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                padding: 16px;
                margin-bottom: 20px;
              }

              .form__info-box__title.has-divider {
                border-top: 1px solid rgba(0, 0, 0, 0.15);
                padding-top: 10px;
              }

              .form__info-box__title {
                font-size: 16px;
                line-height: 1.2;
                font-family: var(--global-font);
                font-weight: 600;
                color: var(--black-color);
                margin: 0 0 16px;
              }

              .form__info-box .form__row:not(:last-child) {
                margin-bottom: 16px;
              }

              .form__info-box .form__col {
                flex: 1;
                max-width: 49.5em;
              }

              .form__info-box .form__col p {
                font-size: 14px;
                font-weight: 400;
                line-height: 1.2;
                color: #262939;
                margin: 0;
                font-family: var(--global-font);
              }

              .form__info-box .form__col p b {
                display: block;
                color: var(--black-color);
                margin: 0 0 8px;
              }

            .msv-block h2{
                font-weight: 700;
                font-size: 24px;
                margin-bottom: 15px;
            }

            .msb-meta{
                display: flex;
                gap: 20px;
                margin-bottom: 25px;
            }

            .msb-meta .msb-meta__item{
                flex: 1;
            }

            .msb-meta .msb-meta__item p{
                font-size: 14px;
                font-weight: 400;
                line-height: 1.5;
                color: #262939;
                margin: 0;
                font-family: var(--global-font);
            }

            .meta-list{
                display: flex;
                gap: 7px;
            }

            .meta-list li{
                border-radius: 4px;
                padding: 5px 8px;
                font-size: 13px;
                background-color: var(--main-color);
                color: #ffffff;
            }

            .pdf-btn-wrap{
                text-align: right;
                padding: 0 25px;
            }

            .collapsable-item {
                margin: 0 0 20px;
              }

              .collapsable-item__header {
                padding: 21px 16px;
                background-color: rgba(0, 0, 0, 0.08);
                position: relative;
                cursor: pointer;
                border-radius: 4px 4px 0 0;
              }

              .collapsable-item__header::after {
                content: "";
                height: 0;
                width: 0;
                border: 10px solid;
                border-color: #000000 transparent transparent transparent;
                position: absolute;
                top: 40%;
                right: 35px;
                /* transition: 0.2s; */
              }

              .active .collapsable-item__header::after {
                top: 30%;
                transform: rotateX(180deg);
              }

              .collapsable-item__header-title {
                font-size: 18px;
                line-height: 1.2;
                font-family: var(--global-font);
                color: var(--black-color);
                margin: 0;
              }

              .collapsable-item__body-row {
                gap: 16px;
                margin-bottom: 20px;
              }

              .collapsable-item__body-col {
                flex: 1;
                max-width: 49.5%;
              }

              .table-wrap {
                overflow-x: auto;
                width: 100%;
            }

            .mdf-form-head p{
                line-height: 2;
            }

            .table-wrap table {
                font-family: "Open Sans", sans-serif;
                position: relative;
                table-layout: auto;
                width: 100%;
                padding-top: 20px;;
                border-radius: 0.5rem;
                border-collapse: initial!important;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              }

              table thead tr {
                color: #2d3748;
                font-size: 1rem;
                font-weight: 500;
                text-align: left;
              }

              table thead tr th {
                background: #cfe0f0;
                padding: 0.75rem 1.5rem;
                vertical-align: middle;
              }

              table tbody tr td {
                background: #cfe0f0;
              }

              table tbody td {
                color: #1a202c;
                text-align: left;
                vertical-align: middle;
                font-size: 1.125rem;
                font-weight: normal;
                padding: 3px 10px;
              }

              table tr > th:first-child, table tr > td:first-child {
                position: sticky;
                left: 0;
              }

              .table-wrap th {
                font-size: 19px;
              }

              .table-wrap td span,
              .table-wrap th span{
                font-size: 75%;
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
                font-size: 26px;
                font-weight: 700;
                margin-top: 40px;
              }

            .mdf-form-wrap h2{
                font-size: 30px;
            }

            @media (max-width: 767px){
                .collapsable-item__body.ams .collapsable-item__body-col{
                    width: 100%;
                    max-width: 100%;
                }

                .collapsable-item__body.ams .collapsable-item__body-row{
                    flex-direction: column;
                }
            }
            </style>
            <body>
            <div className='msv-block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14 mdf-form-wrap'>
                                            <h2>Mission Debriefing Form</h2>
                                            <button
                                                className='mt-4 px-4 py-2 mx-2 bg-main text-white rounded'
                                                onClick={downloadReport}
                                            >
                                                Download PDF
                                            </button>
                                            <div className='mdf-form-body'>
                                                <div className='mdf-form-head'>
                                                    <p>
                                                        Convoy composition
                                                        (Agencies):{" "}

                                                        {mission &&
                                                            mission.agency.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <span>{
                                                                        item.agency_id.name
                                                                    }</span>
                                                                )
                                                            )}

                                                    </p>
                                                    <p>
                                                        Mission Locations visited
                                                        and route:
                                                        <span>Sample Data</span>
                                                    </p>
                                                    <p>
                                                        Date of the mission:{" "}
                                                        <span> {mission &&
                                                            convertDateFormat(
                                                                mission.movement_date
                                                            )}</span>
                                                    </p>
                                                    <p>
                                                        Mission Focal Point:{" "}
                                                        <span> {mission &&
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
                                                                column ‘road
                                                                condition’{" "}
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
                                                                <textarea onInput={setReportData} name='not_passable_road_condition'       value={report.not_passable_road_condition} rows="3"></textarea>

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <textarea
                                                                onInput={setReportData}
                                                                name='not_passable_presence_eds_erw_uxo'
                                                                rows="3"
                                                                value={report.not_passable_presence_eds_erw_uxo}
                                                                ></textarea>

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

                                                                <textarea
                                                                onInput={setReportData}
                                                                name='very_bad_road_condition'
                                                                rows="3"
                                                                value={report.very_bad_road_condition}
                                                                ></textarea>

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <textarea
                                                                onInput={setReportData}
                                                                name='very_bad_presence_eds_erw_uxo'
                                                                rows="3"
                                                                value={report.very_bad_presence_eds_erw_uxo}
                                                                ></textarea>

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
                                                                <textarea
                                                                onInput={setReportData}
                                                                name='bad_road_condition'
                                                                rows="3"
                                                                value={report.bad_road_condition}
                                                                ></textarea>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <textarea
                                                                onInput={setReportData}
                                                                name='bad_presence_eds_erw_uxo'
                                                                rows="3"
                                                                value={report.bad_presence_eds_erw_uxo}
                                                                ></textarea>

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
                                                                <textarea
                                                                onInput={setReportData}
                                                                name='regular_road_condition'
                                                                rows="3"
                                                                value={report.regular_road_condition}
                                                                ></textarea>

                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <textarea
                                                                onInput={setReportData}
                                                                name='regular_presence_eds_erw_uxo'
                                                                rows="3"
                                                                value={report.regular_presence_eds_erw_uxo}
                                                                ></textarea>

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
                                                                <textarea type='text' name='humanitarian_assistance'/>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className='input-wrap'>
                                                                <textarea type='text' name="humanitarian_observations"/>
                                                                </div>
                                                            </td>
                                                        </tr>

                                                        <div>
                                                            <button
                                                                className='mt-4 px-4 py-2 mx-2 bg-main text-white rounded'
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>

                                                        </tbody>
                                                    </table>

                                                </div>
                                            </div>
                                        </div>
            </body>

            </html>`,
            { waitUntil: "domcontentloaded" }
        );
        const pdfBuffer = await page.pdf({
            format: "A4",
            path: "public/report.pdf",
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
