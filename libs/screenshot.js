const puppeteer = require('puppeteer');

async function screenshot(url, path, opts = {}) {
    const viewport = 'viewport' in opts ? opts.viewport : {
        width: 1280, height: 720
    };
    const _timeout = 'timeout' in opts ? opts.timeout : 5000;

    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.setViewport(viewport);

    await page.goto(url, {
        waitUntil: 'networkidle2'
    });

    await page.waitFor(_timeout)

    const clip = await page.evaluate(selector => {
        const element = document.querySelector(selector);
        if (!element)
            return null;
        const {x, y, width, height} = element.getBoundingClientRect();
        return { x, y, width, height };
    }, 'body');

    if(!clip) {
        throw Error(`Element not found`);
    }

    await page.screenshot({path, clip});

    await browser.close();
}

module.exports = screenshot;