import { StyleSheet, Text, View } from "@react-pdf/renderer";
// import MyCustomFont from '../fonts/Anton-Regular.ttf';

// Font.register({
//     family: 'AntonFamily',
//     src: MyCustomFont
// })

const styles = StyleSheet.create({
    sectionTitle: {
        marginBottom: "10px",
        fontSize: "18px",
        fontWeight: "bold",
    },
    sectionSubTitle: {
        marginTop: "5px",
        marginBottom: "10px",
        fontSize: "15px",
        fontWeight: "bold",
    },
    sectionSubTitle2: {
        marginTop: "12px",
        marginBottom: "10px",
        fontSize: "13px",
        fontWeight: "bold",
    },
    sectionText: {
        marginBottom: "8px",
        fontSize: "12px",
    },

    sectionRow: {
        display: "flex",
        flexDirection: "row",
    },

    sectionCol: {
        width: "32%",
        maxWidth: "32%",
        backgroundColor: "#CFE0F0",
        padding: "8px",
        border: "1px solid #ffffff",
    },

    sectionRow2: {
        display: "flex",
        flexDirection: "row",
    },

    sectionCol2: {
        width: "48%",
        maxWidth: "48%",
        backgroundColor: "#CFE0F0",
        padding: "8px",
        border: "1px solid #ffffff",
    },

    label: {
        fontSize: "12px",
        fontWeight: "bold",
    },
    text: {
        fontSize: "10px",
        fontWeight: "400",
    },
});

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

function convertDateFormat(dateString, newFormat) {
    // Parse the input date string
    let parsedDate = new Date(dateString);

    // Format the date according to the new format
    let formattedDate = parsedDate.toLocaleDateString(undefined, {
        dateStyle: "medium",
    });

    return formattedDate;
}

let newDateFormat = "DD/MM/YYYY";

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

const PDFFile = ({ mission, missionLocation, missionVehicle }) => {
    return (
        <>
            <Text style={styles.sectionTitle}>Mission Debriefing Form</Text>
            <Text style={styles.sectionText}>
                Mission Locations visited and route: Beach Health Center- Beach
                Distribution Center, ins 1- ins 2, Beach Distribution Center
            </Text>
            <Text style={styles.sectionText}>
                Date of the mission: Mar 25, 2024
            </Text>
            <Text style={styles.sectionText}>
                Mission Focal Point: staff103
            </Text>
            <Text style={styles.sectionSubTitle}>
                A Road Assessment (few bullet points in relevant section)
            </Text>

            <View style={styles.section}>
                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Road Condition</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>
                            Include remarks description next to the relevant
                            cell under column 'road condition'
                        </Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>
                            Presence of EDs, ERWs, and UXO
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>A. Not Passable</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                </View>
                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>B. Very bad condition</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                </View>
                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>C. Bad condition</Text>{" "}
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                </View>
                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>D. Regular condition</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                </View>

                <Text style={styles.sectionSubTitle2}>
                    Please provide with maps and photographs below if possible
                </Text>

                <Text style={styles.sectionTitle}>Section B</Text>

                <View style={styles.sectionRow2}>
                    <View style={styles.sectionCol2}>
                        <Text style={styles.label}>
                            Insecurity or hostilities affecting humanitarian
                            assistance
                        </Text>
                    </View>
                    <View style={styles.sectionCol2}>
                        <Text style={styles.label}>
                            Humanitarian Observations
                        </Text>
                    </View>
                </View>
                <View style={styles.sectionRow2}>
                    <View style={styles.sectionCol2}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                    <View style={styles.sectionCol2}>
                        <Text style={styles.text}>Data</Text>
                    </View>
                </View>
            </View>
        </>
    );
};

export default PDFFile;
