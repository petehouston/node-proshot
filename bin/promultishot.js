#!/usr/bin/env node

'use strict';

const meow = require('meow');
const normalizeUrl = require('../utils/normalize_url');
const multishot = require('../libs/multishot');

const cli = meow(`
    Usage
        $ promultishot <url> <url> <url> ... 

    Options
        --path      : Set directory to store screenshots. Default to where script is executed.
        --viewport  : Set viewport for screenshot, 'WIDTH:HEIGHT'. Default: '1280:720'.
        --timeout   : Set time to wait for complete ajax loading in milliseconds. Default: 5000.
        --extension : Set image MIME type, either 'jpg' or 'png'. Default: 'png'.

    Example
        $ promultishot --viewport=1920:1080 petehouston.com petehouston.com.png
        $ promultishot --timeout=6000 petehouston.com petehouston.com.png

`, {
    flags: {
        path: {
            type: 'string',
            alias: 'p',
            description: 'Set directory to store screenshots.',
            default: '.'
        },  
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
        },
        extension: {
            type: 'string',
            alias: 'ext',
            description: 'Set image MIME type for screenshot.',
            default: 'png'
        }
    }
});



if(cli.input.length < 1) {
    cli.showHelp();
}

const path = cli.flags.path;

const extension = cli.flags.extension;

if(extension !== 'jpg' && extension !== 'png') {
    ci.showHelp();
}

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
        await multishot(cli.input, path, {
            viewport,
            extension,
            timeout: cli.flags.timeout
        });
        console.log(`File saved to ${path}`);
    })();
    
} catch (error) {
    console.error(error);
}

