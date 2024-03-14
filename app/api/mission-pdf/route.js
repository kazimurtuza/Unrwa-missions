import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent('<html><body><h1>puppeteer</h1></body></html>>', { waitUntil: 'domcontentloaded' });
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        // Close the browser to free up resources
        await browser.close();

        // Create a Buffer from the PDF data
        const buffer = Buffer.from(pdfBuffer);

        // Set the response headers to prompt a file download
        return NextResponse.download(buffer, 'test.pdf', 'application/pdf');
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error(error.message);
    }
}