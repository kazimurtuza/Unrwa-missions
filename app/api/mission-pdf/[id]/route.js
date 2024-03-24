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

        let alldata = await data.missionLocation.map((item, index) => `
    <div style="margin-top: 10px;" class="table-row ">
        <div class="left">Stop 1</div>
        <div class="right">
            <div class="right-row">
                <div>From</div>
                <div>Departure DateTime</div>
                <div>Location</div>
                <div>Longitude</div>
                <div>Latitude</div>
            </div>
            <div class="right-row">
                <div></div>
                 <div>${convertDateTimeFormat(item.departure_time)}</div>
                <div>${item.departure_umrah_id!=null?item.departure_umrah_id.installation_name:item.departure_installation_name}</div>
                  <div>${item.departure_latitude}</div>
                <div>${item.departure_longitude}</div>
            </div>
            <div class="right-row">
                <div>To</div>
                <div>Arrival DateTime</div>
                <div>Location</div>
                <div>Longitude</div>
                <div>Latitude</div>
            </div>
            <div class="right-row">
                <div></div>
                 <div>${convertDateTimeFormat(item.arrival_time)}</div>
               <div>${item.arrival_umrah_id!=null?item.arrival_umrah_id.installation_name:item.arrival_installation_name}</div>
               <div>${item.arrival_latitude}</div>
                <div>${item.arrival_longitude}</div>
            </div>
        </div>
    </div>
`);

        let vicleList = await data.missionVehicle.map((item, index) => `<div style="margin-bottom: 10px; background: gray">Vehicle ${index+1}</div>
                <div class="table-row">
                    <div class="table-col">
                        <h3>Vehicle Details</h3>
                        <p>
                            <strong>Description</strong>
                            <span>${item.vehicle.description}</span>
                        </p>
                        <p>
                            <strong>Vehicle ID #</strong>
                            <span>${item.vehicle.vehicle_id}</span>
                        </p>
                        <p>
                            <strong>Registration / Number Plate:</strong>
                            <span>${item.vehicle.registration_number}</span>
                        </p>
                        <p>
                            <strong>Cargo:</strong>
                            ${item.carried.map(item=> `<span>${item.value}</span>`)}
                        </p>
                    </div>
                    <div class="table-col">
                        <h3>Driver Details</h3>
                        <p>
                            <strong>Names: </strong>
                            <span>${item.driver.name}</span>
                        </p>
                        <p>
                            <strong>Phone Number: </strong>
                            <span>${item.driver.whatsup_number}</span>

                        </p>
                        <p>
                            <strong>ID Number: </strong>
                            <span>${item.driver.driver_id}</span>
                        </p>

                    </div>
                     <div class="table-col">

                    ${item.staff.map((staff,index)=>`

                        <h3>Passenger ${index+1}</h3>
                        <p>
                            <strong>Names: </strong>
                            <span>${staff.staff_id.name}</span>
                        </p>
                        <p>
                            <strong>Phone</strong>
                          <span>${staff.staff_id.phone}</span>
                        </p>
                        <p>
                            <strong>ID</strong>
                            <span>${staff.staff_id.employee_id}</span>
                        </p>

                    `)}
                     </div>

                </div>`);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(`
        <html>

            <style>
            body{
                font-family: arial;
                padding: 30px;
            }

                .divider{
                    height: 10px;
                    background: #000000;
                }

                .main-title{
                    background-color: #FFC000;
                    color: #000000;
                }

                .main-title-alt{
                    background-color: #DAF2D0;
                    color: #000000;
                }

                .list{
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                }

                .list-item{
                    flex: 45%;
                }

                .table-col strong,
                .list-item strong{
                    display: block;
                    font-size: 14px;
                }

                .table-col span,
                .list-item span{
                    display: block;
                    font-size: 12px;
                }

                .table-row{
                    display: flex;
                }

                .table-row .left{
                    flex: 0 0 110px;
                }

                .table-row .right{
                    flex-basis: 1;
                }

                .right-row{
                    display: flex;
                }

                .right-row div{
                    flex-basis: 1;
                    border: 1px solid #777777;
                    padding: 7px;
                    width: 110px;
                    font-size: 14px;
                }

                .right-row div:first-child{
                    width: 40px;
                }

                .right-row div:nth-child(2){
                    width: 150px;
                }

                h3{
                    margin: 0;
                    font-size: 18px;
                }

                .table-col{
                    width: 33%;
                }
            </style>
            <body>
                <div class="divider"></div>
                <div class="main-title">Identifier Information</div>
                <div class="list" style="paddin-top: 5px;">
                    <div class="list-item">
                        <strong>Request Type</strong>
                        <span>${ getStatusString(data.mission.request_status)}</span>
                    </div>
                    <div class="list-item">
                        <strong>Date of Request</strong>
                        <span>${convertDateFormat(data.mission.created_at, newDateFormat)}</span>
                    </div>
                    <div class="list-item">
                        <strong>UNRWA Request #</strong>
                        <span>${data.mission.mission_id}</span>
                    </div>
                    <div class="list-item">
                        <strong>UNOPS ACU #</strong>
                       <span>${data.mission.unops_acu}</span>

                    </div>
                    <div class="list-item">
                        <strong>CLA #</strong>
                          <span>${data.mission.cla}</span>
                    </div>
                    <div class="list-item">
                        <strong>CLA Status</strong>
                        <span>${data.mission.cla_decision}</span>
                    </div>
                </div>

                <div class="divider" style="margin-top: 10px;"></div>
                <div class="main-title">Mission Request Details</div>

                <div class="list" style="paddin-top: 5px;">
                    <div class="list-item">
                        <strong>Movement Date</strong>
                        <span>${convertDateFormat(data.mission.movement_date, newDateFormat)}</span>
                    </div>
                    <div class="list-item">
                        <strong>Agencies</strong>
                        ${data.mission.agency.map(item => `<span>${item.agency_id.name}</span>`).join('')}

                    </div>
                </div>

                <div class="main-title-alt" style="margin: 7px;">Mission Focal Point</div>

                <div class="list" style="paddin-top: 5px;">
                    <div class="list-item">
                        <strong>Names</strong>
                        <span>${data.mission.leader.name}</span>
                    </div>
                    <div class="list-item">
                        <strong>Email</strong>
                        <span>${data.mission.leader.user.email}</span>
                    </div>
                    <div class="list-item">
                        <strong>GSM Phone # 1:</strong>
                        <span>${data.mission.leader.phone_number_one}</span>
                    </div>
                    <div class="list-item">
                        <strong>WhatsApp #</strong>
                        <span>${data.mission.leader.whatsup_number}</span>
                    </div>
                    <div class="list-item">
                        <strong>Sat Phone</strong>
                        <span>${data.mission.leader.phone}</span>
                    </div>
                    <div class="list-item">
                        <strong>GSM Phone # 2:</strong>
                        <span>${data.mission.leader.phone_number_two}</span>
                    </div>
                    <div class="list-item">
                        <strong>Purpose</strong>
                        <span>${data.mission.purpose}</span>
                    </div>
                    <div class="list-item">
                        <strong>Cluster</strong>
                        <span>${data.mission.mission_cluster.name}</span>
                    </div>
                </div>

                <div class="divider" style="margin-top: 10px;"></div>
                <div class="main-title" style="margin-bottom: 10px;">Movement Stops</div>

                ${alldata}
                <!--<div style="margin-top: 10px;" class="table-row ">-->
                    <!--<div class="left">Stop 1</div>-->
                    <!--<div class="right">-->
                        <!--<div class="right-row">-->
                            <!--<div>From</div>-->
                            <!--<div>Departure DateTime</div>-->
                            <!--<div>Location</div>-->
                            <!--<div>Longitude</div>-->
                            <!--<div>Latitude</div>-->
                        <!--</div>-->
                        <!--<div class="right-row">-->
                            <!--<div></div>-->
                            <!--<div>03/12/2015</div>-->
                            <!--<div>Dhaka</div>-->
                            <!--<div>65656</div>-->
                            <!--<div>565656</div>-->
                        <!--</div>-->
                        <!--<div class="right-row">-->
                            <!--<div>To</div>-->
                            <!--<div>Departure DateTime</div>-->
                            <!--<div>Location</div>-->
                            <!--<div>Longitude</div>-->
                            <!--<div>Latitude</div>-->
                        <!--</div>-->
                        <!--<div class="right-row">-->
                            <!--<div></div>-->
                            <!--<div>03/12/2015</div>-->
                            <!--<div>Dhaka</div>-->
                            <!--<div>65656</div>-->
                            <!--<div>565656</div>-->
                        <!--</div>-->
                    <!--</div>-->

                <!--</div>-->

                <!--<div class="table-row" style="margin-top: 10px;">-->
                    <!--<div class="left">Stop 2</div>-->
                    <!--<div class="right">-->
                        <!--<div class="right-row">-->
                            <!--<div>From</div>-->
                            <!--<div>Departure DateTime</div>-->
                            <!--<div>Location</div>-->
                            <!--<div>Longitude</div>-->
                            <!--<div>Latitude</div>-->
                        <!--</div>-->
                        <!--<div class="right-row">-->
                            <!--<div></div>-->
                            <!--<div>03/12/2015</div>-->
                            <!--<div>Dhaka</div>-->
                            <!--<div>65656</div>-->
                            <!--<div>565656</div>-->
                        <!--</div>-->
                        <!--<div class="right-row">-->
                            <!--<div>To</div>-->
                            <!--<div>Departure DateTime</div>-->
                            <!--<div>Location</div>-->
                            <!--<div>Longitude</div>-->
                            <!--<div>Latitude</div>-->
                        <!--</div>-->
                        <!--<div class="right-row">-->
                            <!--<div></div>-->
                            <!--<div>03/12/2015</div>-->
                            <!--<div>Dhaka</div>-->
                            <!--<div>65656</div>-->
                            <!--<div>565656</div>-->
                        <!--</div>-->
                    <!--</div>-->

                <!--</div>-->

                <!--<div class="table-row" style="margin-top: 10px;">-->
                    <!--<div class="left">Stop 3</div>-->
                    <!--<div class="right">-->
                        <!--<div class="right-row">-->
                            <!--<div>From</div>-->
                            <!--<div>Departure DateTime</div>-->
                            <!--<div>Location</div>-->
                            <!--<div>Longitude</div>-->
                            <!--<div>Latitude</div>-->
                        <!--</div>-->
                        <!--<div class="right-row">-->
                            <!--<div></div>-->
                            <!--<div>03/12/2015</div>-->
                            <!--<div>Dhaka</div>-->
                            <!--<div>65656</div>-->
                            <!--<div>565656</div>-->
                        <!--</div>-->
                        <!--<div class="right-row">-->
                            <!--<div>To</div>-->
                            <!--<div>Departure DateTime</div>-->
                            <!--<div>Location</div>-->
                            <!--<div>Longitude</div>-->
                            <!--<div>Latitude</div>-->
                        <!--</div>-->
                        <!--<div class="right-row">-->
                            <!--<div></div>-->
                            <!--<div>03/12/2015</div>-->
                            <!--<div>Dhaka</div>-->
                            <!--<div>65656</div>-->
                            <!--<div>565656</div>-->
                        <!--</div>-->
                    <!--</div>-->

                <!--</div>-->

                <div style={page-break-after: always;}>

                <div class="divider" style="margin-top: 10px;"></div>
                <div class="main-title" style="margin-bottom: 10px;">Vehicles / Drivers / Passengers</div>

              ${vicleList}
                <!--<div style="margin-bottom: 10px; background: gray">Vehicle One</div>-->
                <!--<div class="table-row">-->
                    <!--<div class="table-col">-->
                        <!--<h3>Vehicle Details</h3>-->
                        <!--<p>-->
                            <!--<strong>Description</strong>-->
                            <!--<span>Description</span>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<strong>Vehicle ID #</strong>-->
                            <!--<span>6565656</span>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<strong>Registration / Number Plate:</strong>-->
                            <!--<span>6565656</span>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<strong>Cargo:</strong>-->
                            <!--<span>CS 2526</span>-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="table-col">-->
                        <!--<h3>Driver Details</h3>-->
                        <!--<p>-->
                            <!--<strong>Names: </strong>-->
                            <!--<span>Description</span>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<strong>Phone Number: </strong>-->
                            <!--<span>6565656</span>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<strong>ID Number: </strong>-->
                            <!--<span>6565656</span>-->
                        <!--</p>-->

                    <!--</div>-->
                    <!--<div class="table-col">-->
                        <!--<h3>Passenger 1</h3>-->
                        <!--<p>-->
                            <!--<strong>Names: </strong>-->
                            <!--<span>Names</span>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<strong>Phone</strong>-->
                            <!--<span>6565656</span>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<strong>ID</strong>-->
                            <!--<span>6565656</span>-->
                        <!--</p>-->
                        <!--<h3>Passenger 2</h3>-->
                        <!--<p>-->
                            <!--<strong>Names: </strong>-->
                            <!--<span>Names</span>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<strong>Phone</strong>-->
                            <!--<span>6565656</span>-->
                        <!--</p>-->
                        <!--<p>-->
                            <!--<strong>ID</strong>-->
                            <!--<span>6565656</span>-->
                        <!--</p>-->

                    <!--</div>-->
                <!--</div>-->

            </body>
        </html>`, {waitUntil: 'domcontentloaded'});

        var name=`public/mission-pdf/${mission.mission_id}.pdf`
        const pdfBuffer = await page.pdf({
            format: 'A4',
            path: name,
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