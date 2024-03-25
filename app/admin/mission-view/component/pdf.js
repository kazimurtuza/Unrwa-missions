import { StyleSheet, Text, View } from "@react-pdf/renderer";
// import MyCustomFont from '../fonts/Anton-Regular.ttf';

// Font.register({
//     family: 'AntonFamily',
//     src: MyCustomFont
// })

const styles = StyleSheet.create({
    sectionRow: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '12px'
    },
    sectionRowHead: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '0px'
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #dddddd',
    },
    tableCol1:{
        width: '15%',
        maxWidth: '15%',
        borderRight: '1px solid #dddddd',
        fontSize: '12px',
        fontWeight: 'bold',
        padding:'5px 8px',
        whiteSpace: 'nowrap'
    },
    tableCol2:{
        width: '35%',
        maxWidth: '40%',
        borderRight: '1px solid #dddddd',
        fontSize: '12px',
        fontWeight: 'bold',
        padding:'5px 8px',
        whiteSpace: 'nowrap'
    },
    tableCol3:{
        width: '15%',
        maxWidth: '15%',
        borderRight: '1px solid #dddddd',
        fontSize: '12px',
        fontWeight: 'bold',
        padding:'5px 8px',
        whiteSpace: 'nowrap'
    },
    tableCol4:{
        width: '15%',
        maxWidth: '15%',
        borderRight: '1px solid #dddddd',
        fontSize: '12px',
        fontWeight: 'bold',
        padding:'5px 8px',
        whiteSpace: 'nowrap'
    },
    tableCol5:{
        width: '15%',
        maxWidth: '15%',
        fontSize: '12px',
        fontWeight: 'bold',
        padding:'5px 8px',
        whiteSpace: 'nowrap'
    },

    sectionCol: {
        width: '48%',
        maxWidth: '48%',
    },
    textTitle: {
        backgroundColor: '#dddddd',
        padding: '8px',
        margin: '8px 0 8px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    sectionTitle: {
        borderTop: '8px solid black;',
        backgroundColor: '#f2b500',
        padding: '8px 8px 0',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    vehicleSection:{
        backgroundColor: '#FCFFBE',
    },
    vehicleTitle: {
        backgroundColor: '#dddddd',
        padding: '8px',
        margin: '8px 0 8px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    sectionTitle2: {
        backgroundColor: '#a4e0db',
        padding: '8px',
        marginTop: '8px',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: 'bold'
    },
    tableTitle: {
        marginTop: '14px',
        marginBottom: '12px',
        fontSize: '13px',
        fontWeight: 'bold'
    },
    label:{
        fontSize: '12px',
        fontWeight: 'bold'
    },
    text:{
        fontSize: '10px',
        fontWeight: '400'
    }
});

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

function convertDateFormat(dateString, newFormat) {
    // Parse the input date string
    let parsedDate = new Date(dateString);

    // Format the date according to the new format
    let formattedDate = parsedDate.toLocaleDateString(undefined, {dateStyle: 'medium'});

    return formattedDate;
}
let newDateFormat = "DD/MM/YYYY";

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




const PDFFile = ({mission,missionLocation,missionVehicle}) => {
    return (
        <>
            <Text style={styles.sectionTitle}>Identifier Information</Text>
            <View style={styles.section}>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Request Type</Text>
                        <Text style={styles.text}>{mission && getStatusString(mission.request_status)}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Date of Request</Text>
                        <Text style={styles.text}>{mission && convertDateFormat(mission.created_at, newDateFormat)}</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>UNRWA Request</Text>
                        <Text style={styles.text}>{mission && mission.mission_id}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>UNOPS ACU</Text>
                        <Text style={styles.text}>{mission && mission.unops_acu}</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>CLA</Text>
                        <Text style={styles.text}>{mission && mission.cla}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>CLA Status</Text>
                        <Text style={styles.text}>{mission && mission.cla_decision}</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Mission Request Details</Text>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Movement Date</Text>
                        <Text style={styles.text}>{mission && convertDateFormat(mission.movement_date, newDateFormat)}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Agencies
                        </Text>
                            {mission && mission.agency.map(item =>( <Text style={styles.text}>{item.agency_id.name}</Text>))}

                    </View>
                </View>

                <Text style={styles.sectionTitle2}>Mission Focal Point</Text>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Names</Text>
                        <Text style={styles.text}>{mission && mission.leader.name}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.text}>{mission && mission.leader.user.email}</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>GSM Phone 1</Text>
                        <Text style={styles.text}>{mission && mission.leader.phone_number_one}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>WhatsApp</Text>
                        <Text style={styles.text}>{mission && mission.leader.whatsup_number}</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Sat Phone</Text>
                        <Text style={styles.text}>{mission && mission.leader.phone}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>GSM Phone 2</Text>
                        <Text style={styles.text}>{mission && mission.leader.phone_number_two}</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Purpose</Text>
                        <Text style={styles.text}>{mission && mission.purpose}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Cluster</Text>
                        <Text style={styles.text}>{mission && mission.mission_cluster.name}</Text>
                    </View>
                </View>
                {missionLocation && missionLocation.map((item, index) =>
                    (
                <><Text style={styles.sectionTitle}>Movement Stops {index+1}</Text>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                        <Text style={styles.tableLabel}>From</Text>
                    </View>
                    <View style={styles.tableCol2}>
                        <Text style={styles.tableLabel}>Departure DateTime</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableLabel}>Location</Text>
                    </View>
                    <View style={styles.tableCol4}>
                        <Text style={styles.tableLabel}>Longitude</Text>
                    </View>
                    <View style={styles.tableCol5}>
                        <Text style={styles.tableLabel}>Latitude</Text>
                    </View>
                </View>

                <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                        <Text style={styles.tableLabel}></Text>
                    </View>
                    <View style={styles.tableCol2}>
                        <Text style={styles.tableLabel}>{convertDateTimeFormat(item.departure_time)}</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableLabel}>{item.departure_umrah_id!=null?item.departure_umrah_id.installation_name:item.departure_installation_name}</Text>
                    </View>
                    <View style={styles.tableCol4}>
                        <Text style={styles.tableLabel}>{item.departure_longitude}</Text>
                    </View>
                    <View style={styles.tableCol5}>
                        <Text style={styles.tableLabel}>{item.departure_latitude}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                        <Text style={styles.tableLabel}>To</Text>
                    </View>
                    <View style={styles.tableCol2}>
                        <Text style={styles.tableLabel}>Arrival DateTime</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableLabel}>Location</Text>
                    </View>
                    <View style={styles.tableCol4}>
                        <Text style={styles.tableLabel}>Longitude</Text>
                    </View>
                    <View style={styles.tableCol5}>
                        <Text style={styles.tableLabel}>Latitude</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                        <Text style={styles.tableLabel}></Text>
                    </View>
                    <View style={styles.tableCol2}>
                        <Text style={styles.tableLabel}>{convertDateTimeFormat(item.arrival_time)}</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableLabel}>{item.arrival_umrah_id!=null?item.arrival_umrah_id.installation_name:item.arrival_installation_name}</Text>
                    </View>
                    <View style={styles.tableCol4}>
                        <Text style={styles.tableLabel}>{item.arrival_latitude}</Text>
                    </View>
                    <View style={styles.tableCol5}>
                        <Text style={styles.tableLabel}>{item.arrival_longitude}</Text>
                    </View>
                </View>

                </>))}

                <Text style={styles.sectionTitle}>Vehicles / Drivers / Passengers</Text>

                {missionVehicle && missionVehicle.map((item,index)=>
                    <>
                <Text style={styles.textTitle}>Vehicle Details {index+1}</Text>
                <View style={[styles.sectionRow, styles.vehicleSection]}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Description</Text>
                        <Text style={styles.text}>{item.vehicle.description}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Vehicle ID</Text>
                        <Text style={styles.text}>{item.vehicle.vehicle_id}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Registration / Number Plate</Text>
                        <Text style={styles.text}>{item.vehicle.registration_number}</Text>
                    </View>
                </View>
                 <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Cargo</Text>
                       {item.carried.map(item=>  <Text style={styles.text}>{item.value}</Text>)}
                    </View>
                </View>

                <Text style={styles.textTitle}>Driver Details</Text>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Names</Text>
                        <Text style={styles.text}>{item.driver.name}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>ID Number</Text>
                        <Text style={styles.text}>{item.driver.driver_id}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Phone Number:</Text>
                        <Text style={styles.text}>{item.driver.phone_number_one}</Text>
                    </View>
                </View>


                        {item.staff.map((staff,index)=>
                <><Text style={styles.textTitle}>Passenger {index+1}</Text>
                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Names</Text>
                        <Text style={styles.text}>{staff.staff_id.name}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.text}>{staff.staff_id.phone_number_one}</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>ID</Text>
                        <Text style={styles.text}>{staff.staff_id.employee_id}</Text>
                    </View>
                </View> </>
                        )}

                    </>)}

            </View>
        </>
    );
};

export default PDFFile;