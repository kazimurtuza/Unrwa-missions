"use client";
import React, { useState } from 'react';
import { Document, Page, Text, PDFDownloadLink } from '@react-pdf/renderer';

const MyPDF = () => {
    // State to track whether the PDF content is ready for download
    const [pdfReady, setPdfReady] = useState(true);
    // Function to handle generating the PDF content
    const generatePDF = () => {
        // Your PDF content generation logic here
        setPdfReady(true); // Set pdfReady to true when PDF content is ready
    };

    // Function to render PDF content
    const renderPDFContent = () => {
        if (!pdfReady) {
            return (
                <button onClick={generatePDF}>Generate PDF</button>
            );
        }

        return (
            <Document>
                <Page>
                    <Text>Sample PDF Content</Text>
                </Page>
            </Document>
        );
    };

    return (
        <div>
            {/* Render PDF content */}
            {renderPDFContent()}

            {/* Download link */}
            {pdfReady && (
                <PDFDownloadLink document={<Document>
                    <Page>
                        <Text>Sample PDF Content---------</Text>
                    </Page>
                </Document>} fileName="sample.pdf">
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download PDF'
                    }
                </PDFDownloadLink>
            )}
        </div>
    );
};

export default MyPDF;