import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET() {
    try {
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
                    flex: 0 0 150px;
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
                    width: 50px;
                }

                .right-row div:nth-child(2){
                    width: 170px;
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
                        <span>Mission Type</span>
                    </div>
                    <div class="list-item">
                        <strong>Date of Request</strong>
                        <span>Date of Request</span>
                    </div>
                    <div class="list-item">
                        <strong>UNRWA Request #</strong>
                        <span>UNRWA Request #</span>
                    </div>
                    <div class="list-item">
                        <strong>UNOPS ACU #</strong>
                        <span>UNOPS ACU #</span>
                    </div>
                    <div class="list-item">
                        <strong>CLA #</strong>
                        <span>CLA #</span>
                    </div>
                    <div class="list-item">
                        <strong>CLA Status</strong>
                        <span>CLA Status</span>
                    </div>
                </div>

                <div class="divider" style="margin-top: 10px;"></div>
                <div class="main-title">Mission Request Details</div>

                <div class="list" style="paddin-top: 5px;">
                    <div class="list-item">
                        <strong>Movement Date</strong>
                        <span>Movement Date</span>
                    </div>
                    <div class="list-item">
                        <strong>Agencies</strong>
                        <span>Agencies</span>
                    </div>
                </div>

                <div class="main-title-alt" style="margin: 7px;">Mission Focal Point</div>

                <div class="list" style="paddin-top: 5px;">
                    <div class="list-item">
                        <strong>Names</strong>
                        <span>Names</span>
                    </div>
                    <div class="list-item">
                        <strong>Email</strong>
                        <span>Email</span>
                    </div>
                    <div class="list-item">
                        <strong>GSM Phone # 1:</strong>
                        <span>GSM Phone # 1:</span>
                    </div>
                    <div class="list-item">
                        <strong>WhatsApp #</strong>
                        <span>WhatsApp #</span>
                    </div>
                    <div class="list-item">
                        <strong>Sat Phone</strong>
                        <span>Sat Phone</span>
                    </div>
                    <div class="list-item">
                        <strong>GSM Phone # 2:</strong>
                        <span>GSM Phone # 2:</span>
                    </div>
                    <div class="list-item">
                        <strong>Purpose</strong>
                        <span>Purpose</span>
                    </div>
                    <div class="list-item">
                        <strong>Cluster</strong>
                        <span>Cluster</span>
                    </div>
                </div>

                <div class="divider" style="margin-top: 10px;"></div>
                <div class="main-title" style="margin-bottom: 10px;">Movement Stops</div>

                <div class="table-row">
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
                            <div>03/12/2015</div>
                            <div>Dhaka</div>
                            <div>65656</div>
                            <div>565656</div>
                        </div>
                        <div class="right-row">
                            <div>To</div>
                            <div>Departure DateTime</div>
                            <div>Location</div>
                            <div>Longitude</div>
                            <div>Latitude</div>
                        </div>
                        <div class="right-row">
                            <div></div>
                            <div>03/12/2015</div>
                            <div>Dhaka</div>
                            <div>65656</div>
                            <div>565656</div>
                        </div>
                    </div>

                </div>

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
                <div style="margin-bottom: 10px; background: gray">Vehicle One</div>

                <div class="table-row">
                    <div class="table-col">
                        <h3>Vehicle Details</h3>
                        <p>
                            <strong>Description</strong>
                            <span>Description</span>
                        </p>
                        <p>
                            <strong>Vehicle ID #</strong>
                            <span>6565656</span>
                        </p>
                        <p>
                            <strong>Registration / Number Plate:</strong>
                            <span>6565656</span>
                        </p>
                        <p>
                            <strong>Cargo:</strong>
                            <span>CS 2526</span>
                        </p>
                    </div>
                    <div class="table-col">
                        <h3>Driver Details</h3>
                        <p>
                            <strong>Names: </strong>
                            <span>Description</span>
                        </p>
                        <p>
                            <strong>Phone Number: </strong>
                            <span>6565656</span>
                        </p>
                        <p>
                            <strong>ID Number: </strong>
                            <span>6565656</span>
                        </p>

                    </div>
                    <div class="table-col">
                        <h3>Passenger 1</h3>
                        <p>
                            <strong>Names: </strong>
                            <span>Names</span>
                        </p>
                        <p>
                            <strong>Phone</strong>
                            <span>6565656</span>
                        </p>
                        <p>
                            <strong>ID</strong>
                            <span>6565656</span>
                        </p>
                        <h3>Passenger 2</h3>
                        <p>
                            <strong>Names: </strong>
                            <span>Names</span>
                        </p>
                        <p>
                            <strong>Phone</strong>
                            <span>6565656</span>
                        </p>
                        <p>
                            <strong>ID</strong>
                            <span>6565656</span>
                        </p>

                    </div>
                </div>

            </body>
        </html>`, { waitUntil: 'domcontentloaded' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            path: 'public/test.pdf',
            printBackground: true
        });

        // Close the browser to free up resources
        await browser.close();

        return NextResponse.json({ result: 'success', success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error(error.message);
    }
}