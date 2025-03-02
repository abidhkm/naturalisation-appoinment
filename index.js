import { chromium } from 'playwright';
import sound from 'sound-play';

const APPOINTMENT_URL = "https://service.berlin.de/terminvereinbarung/termin/restart/?providerList=122626%2C122659%2C122666%2C122671%2C325853%2C325987%2C351438%2C351444%2C351636&requestList=351180"; // Replace with actual URL

async function checkAppointment() {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    while (true) {
        await page.goto(APPOINTMENT_URL);
        const content = await page.content();
        
        if (!content.includes("Leider sind aktuell keine Termine für ihre Auswahl verfügbar")) { // Adjust based on actual page content
            await sound.play("notification.mp3");
        }
        
        console.log("No appointments found. Retrying in 40 seconds...", new Date());
        await new Promise(resolve => setTimeout(resolve, 40000));
    }
    
    // await browser.close();
}

checkAppointment();