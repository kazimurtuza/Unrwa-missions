/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, View, Text, Image, PDFViewer, StyleSheet, Font } from "@react-pdf/renderer";
import { useClient } from 'next/client'; // Import useClient from next/client

Font.register({ family: "Inter", src: "/assets/font.otf" });

const styles = StyleSheet.create({
    body: {
        paddingTop: 20,
        fontFamily: "Inter"
    }
});

const PDF = () => {
    return (
        <Document>
            <Page style={styles.body}>
                <View style={{ display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                    <Text wrap={false} style={{ alignSelf: "flex-end" }}>Goodbye, world!hgdkljfhsalhgfljadhsgflhasdlhfgsaljdhgflhasgflhgasdl;hfg;aksdjgf;kjsdahf;kjhasd;kjhf;kjashdf;kjhasd;kjfhjks;adhfkjhsadk;jfhaskjdhfkjsahdfkjhsadkj;hfkjsdhfkjhasd;kjhfkjsadhfkjhsda;kjh;</Text>
                </View>
                <View>
                    <Image src="/assets/image.png" />
                </View>
            </Page>
        </Document>
    );
};

const PDFView = () => {
    // Wrap the component with useClient to mark it as a client component
    useClient();

    return (
        <PDFViewer>
            <PDF />
        </PDFViewer>
    );
};

export default PDFView;