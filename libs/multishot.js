const puppeteer = require('puppeteer');
const normalizeUrl = require('../utils/normalize_url');

function makeFilename(url, path, ext) {
    let u = new URL(url);
    return path + '/' + u.hostname + '.' + ext;
}

//TOOD
// - merge with screenshot if possible
async function multishot(urls, path, opts = {}) {
    const viewport = 'viewport' in opts ? opts.viewport : {
        width: 1280, height: 720
    };
    const _timeout = 'timeout' in opts ? opts.timeout : 5000;
    const _path = !!path ? path : '.';
    const _ext = 'extension' in opts ? opts.extension : 'png';

    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();
    await page.setViewport(viewport);

    for(let i = 0; i < urls.length; ++i) {
        let url = normalizeUrl(urls[i]);
        console.log(url);
        let _filename = makeFilename(url, _path, _ext);
        await page.goto(url, {
            waitUntil: 'networkidle2'
        });

        await page.evaluate(() => {
            window.scroll({
                top: document.body.offsetHeight, behavior: 'smooth'
            });
        });
        await page.waitFor(_timeout);

        await page.evaluate(() => {
            window.scroll({
                top: 0, behavior: 'smooth'
            });
        });
        await page.waitFor(_timeout);

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

        await page.screenshot({path: _filename, clip});
    }

    await browser.close();
}

module.exports = multishot;