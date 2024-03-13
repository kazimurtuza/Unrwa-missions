"use client";
// import {MissionPDF} from "./components/missionPdf";

import "./style.css";

function MissionVIew() {
    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                <main>
                    <div className='container mx-auto px-4 sm:px-8'>
                        <div className='py-8'>
                            <main>
                                <div className='px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto'>

                                    <div className='msv-block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14'>
                                        <h2>Section heading</h2>

                                        <div className='form__info-box'>
                                            <h3 className='form__info-box__title'>
                                                Mission Focal Point Contact
                                                Details
                                            </h3>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Name</b>
                                                    </p>
                                                    <p>Robin Courso</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Satellite Phone</b>
                                                    </p>
                                                    <p>343434343434</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Phone</b>
                                                    </p>
                                                    <p>343434343434</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Email Address</b>
                                                    </p>
                                                    <p>
                                                        sajeeb2@technovicinity.com
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Whatsapp</b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='msb-meta-wrap'>
                                            <div className='msb-meta'>
                                                <div className='msb-meta__item'>
                                                    <h4 className="form__info-box__title">Agencies</h4>
                                                    <ul className='meta-list'>
                                                        <li>Test Agency 1</li>
                                                        <li>Test Agency 2</li>
                                                    </ul>
                                                </div>
                                                <div className='msb-meta__item'>
                                                    <h4 className="form__info-box__title">Movement Date</h4>
                                                    <p>03/19/2024</p>
                                                </div>
                                            </div>

                                            <div className='msb-meta'>
                                                <div className='msb-meta__item'>
                                                    <h4 className="form__info-box__title">Purpose</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aspernatur veritatis ipsa consequuntur voluptas inventore illo sit iure similique harum adipisci, minima ex rerum facere optio quos excepturi vero, praesentium laudantium molestiae. Porro sed id, provident voluptates error quod quam.</p>
                                                </div>
                                                <div className='msb-meta__item'>
                                                    <h4 className="form__info-box__title">Remarks</h4>
                                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos aspernatur veritatis ipsa consequuntur voluptas inventore illo sit iure similique harum adipisci, minima ex rerum facere optio quos excepturi vero, praesentium laudantium molestiae. Porro sed id, provident voluptates error quod quam.</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='msv-block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14'>
                                        <h2>Movement Stops</h2>

                                        <div className='form__info-box'>
                                            <h3 className='form__info-box__title'>
                                                Departure
                                            </h3>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Departure Time</b>
                                                    </p>
                                                    <p>03/10/2024 11.25 AM</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Facility Ownership</b>
                                                    </p>
                                                    <p>UNRAW</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Premise Type</b>
                                                    </p>
                                                    <p>One 5</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Installation Name</b>
                                                    </p>
                                                    <p>
                                                        Xyz center Ltd.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Building Code

                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Longitude
                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Latitude
                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                            </div>
                                            <h3 className='form__info-box__title has-divider'>
                                                Arrival
                                            </h3>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Arrival Time</b>
                                                    </p>
                                                    <p>03/10/2024 11.25 AM</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Facility Ownership</b>
                                                    </p>
                                                    <p>UNRAW</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Premise Type</b>
                                                    </p>
                                                    <p>One 5</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Installation Name</b>
                                                    </p>
                                                    <p>
                                                        Xyz center Ltd.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Building Code</b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Longitude
                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Latitude</b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form__info-box'>
                                            <h3 className='form__info-box__title'>
                                                Departure
                                            </h3>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Departure Time</b>
                                                    </p>
                                                    <p>03/10/2024 11.25 AM</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Facility Ownership</b>
                                                    </p>
                                                    <p>UNRAW</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Premise Type</b>
                                                    </p>
                                                    <p>One 5</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Installation Name</b>
                                                    </p>
                                                    <p>
                                                        Xyz center Ltd.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Building Code

                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Longitude
                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Latitude
                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                            </div>
                                            <h3 className='form__info-box__title has-divider'>
                                                Arrival
                                            </h3>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Arrival Time</b>
                                                    </p>
                                                    <p>03/10/2024 11.25 AM</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Facility Ownership</b>
                                                    </p>
                                                    <p>UNRAW</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Premise Type</b>
                                                    </p>
                                                    <p>One 5</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Installation Name</b>
                                                    </p>
                                                    <p>
                                                        Xyz center Ltd.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Building Code

                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Longitude
                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Latitude
                                                        </b>
                                                    </p>
                                                    <p>656565656565</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className='msv-block bg-white shadow-md rounded px-8 pt-6 pb-8 mb-14'>
                                        <h2>Vehicle and Driver Details</h2>

                                        <div className='form__info-box'>
                                            <h3 className='form__info-box__title'>
                                                Driver
                                            </h3>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Agency Name</b>
                                                    </p>
                                                    <p>XYZ Agency </p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Driver Name</b>
                                                    </p>
                                                    <p>Mr. Micherl Anmoly</p>
                                                </div>
                                            </div>

                                            <h3 className='form__info-box__title has-divider'>
                                                Vehicle
                                            </h3>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Vehicle Registration #
                                                        </b>
                                                    </p>
                                                    <p>1214545454</p>
                                                </div>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Vehicle Type (Model)</b>
                                                    </p>
                                                    <p>696665</p>
                                                </div>
                                            </div>
                                            <div className='form__row flex-ctr-spb'>
                                                <div className='form__col'>
                                                    <p>
                                                        <b>Vehicle Body Description</b>
                                                    </p>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, tempora!</p>
                                                </div>
                                            </div>

                                            <h3 className='form__info-box__title has-divider'>
                                                Staff
                                            </h3>

                                            <ul className="meta-list">
                                                <li>John Doe</li>
                                                <li>Michel True</li>
                                                <li>Any Jacson</li>
                                                <li>Donal Trump</li>
                                            </ul>

                                        </div>

                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MissionVIew;
