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

const PDFFile = () => {
    return (
        <>
            <Text style={styles.sectionTitle}>Identifier Information</Text>
            <View style={styles.section}>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Request Type</Text>
                        <Text style={styles.text}>Request Type</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Date of Request</Text>
                        <Text style={styles.text}>Mar 22, 2024</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>UNRWA Request</Text>
                        <Text style={styles.text}>UNRWA Request</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>UNOPS ACU</Text>
                        <Text style={styles.text}>UNOPS ACU</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>CLA</Text>
                        <Text style={styles.text}>null</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>CLA Status</Text>
                        <Text style={styles.text}>Null</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Mission Request Details</Text>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Movement Date</Text>
                        <Text style={styles.text}>null</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>CLA Status</Text>
                        <Text style={styles.text}>Null</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle2}>Mission Focal Point</Text>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Names</Text>
                        <Text style={styles.text}>Staff100</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.text}>Email@sdfd.dsff</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>GSM Phone 1</Text>
                        <Text style={styles.text}>66666666</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>WhatsApp</Text>
                        <Text style={styles.text}>65644545</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Sat Phone</Text>
                        <Text style={styles.text}>66666666</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>GSM Phone 2</Text>
                        <Text style={styles.text}>65644545</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Purpose</Text>
                        <Text style={styles.text}>fsdfdsf</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Cluster</Text>
                        <Text style={styles.text}>fsdafsfds</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Movement Stops</Text>

                <Text style={styles.tableTitle}>Stop 1</Text>

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
                        <Text style={styles.tableLabel}>656556</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableLabel}>5656</Text>
                    </View>
                    <View style={styles.tableCol4}>
                        <Text style={styles.tableLabel}>6565</Text>
                    </View>
                    <View style={styles.tableCol5}>
                        <Text style={styles.tableLabel}>54545</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol1}>
                        <Text style={styles.tableLabel}>To</Text>
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
                        <Text style={styles.tableLabel}>656556</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableLabel}>5656</Text>
                    </View>
                    <View style={styles.tableCol4}>
                        <Text style={styles.tableLabel}>6565</Text>
                    </View>
                    <View style={styles.tableCol5}>
                        <Text style={styles.tableLabel}>54545</Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Vehicles / Drivers / Passengers</Text>
                <Text style={styles.vehicleTitle}>Vehicle 1</Text>

                <Text style={styles.textTitle}>Vehicle Details</Text>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Description</Text>
                        <Text style={styles.text}>Description</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Vehicle ID</Text>
                        <Text style={styles.text}>s100</Text>
                    </View>
                </View>

                 <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Registration / Number Plate</Text>
                        <Text style={styles.text}>Registration / Number Plate</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Cargo</Text>
                        <Text style={styles.text}>Cargo</Text>
                    </View>
                </View>

                <Text style={styles.textTitle}>Driver Details</Text>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Names</Text>
                        <Text style={styles.text}>Names</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Phone Number:</Text>
                        <Text style={styles.text}>Phone Number:</Text>
                    </View>
                </View>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>ID Number</Text>
                        <Text style={styles.text}>66565</Text>
                    </View>
                </View>

                <Text style={styles.textTitle}>Passenger 1</Text>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Names</Text>
                        <Text style={styles.text}>Names</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.text}>Phone</Text>
                    </View>
                </View>
                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>ID</Text>
                        <Text style={styles.text}>65656</Text>
                    </View>
                </View>

                <Text style={styles.textTitle}>Passenger 2</Text>

                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Names</Text>
                        <Text style={styles.text}>Names</Text>
                    </View>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.text}>Phone</Text>
                    </View>
                </View>
                <View style={styles.sectionRow}>
                    <View style={styles.sectionCol}>
                        <Text style={styles.label}>ID</Text>
                        <Text style={styles.text}>65656</Text>
                    </View>
                </View>

            </View>
        </>
    );
};

export default PDFFile;