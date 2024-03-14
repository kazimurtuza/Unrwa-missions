"use client";
import puppeteer from 'puppeteer'
async function MissionPdf() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent('<html><body><h1>puppeteer</h1></body></html>>', {waitUntil: 'domcontentloaded'});
    const pdfBuffer = await page.pdf({
        format: 'A4',
        path: './test.pdf',
        printBackground: true
    })
}

export default MissionPdf