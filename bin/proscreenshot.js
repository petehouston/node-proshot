#!/usr/bin/env node

'use strict';

const meow = require('meow');
const normalizeUrl = require('../utils/normalize_url');
const screenshot = require('../libs/screenshot');

const cli = meow(`
    Usage
        $ proscreenshot <url> <filename> 

    Options
        --viewport : Set viewport for screenshot, 'WIDTH:HEIGHT'. Default: '1280:720'.
        --timeout  : Set time to wait for complete ajax loading in milliseconds. Default: 5000.

    Example
        $ proscreenshot --viewport=1920:1080 petehouston.com petehouston.com.png
        $ proscreenshot --timeout=6000 petehouston.com petehouston.com.png

`, {
    flags: {
        viewport: {
            type: 'string',
            alias: 'vp',
            description: 'Set viewport for screenshot.',
            default: '1280:720'
        },
        timeout: {
            type: 'number',
            alias: 'to',
            description: 'Set time to wait for complete ajax loading in milliseconds.',
            default: 5000
        }
    }
});

let [url, filename] = cli.input;

if(!url) {
    cli.showHelp();
}

url = normalizeUrl(url);

const path = !!filename ? filename : 'screenshot.png';

let inViewport = cli.flags.viewport;
let viewport = { width: 1280, height: 720 };

if(!!inViewport && inViewport.split(':').length != 2) {
    cli.showHelp();
}

if(!!inViewport) {
    const [width, height] = inViewport.split(':');
    if(!width || !height) cli.showHelp();

    viewport = {
        width: parseInt(width), 
        height: parseInt(height)
    }
}

try {
    (async () => {
        await screenshot(url, path, {viewport});
        console.log(`File saved to ${path}`);
    })();
    
} catch (error) {
    console.error(error);
}

