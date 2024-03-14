import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent('<html><body><h1>puppeteer</h1></body></html>>', { waitUntil: 'domcontentloaded' });
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