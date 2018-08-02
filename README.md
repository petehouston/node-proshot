# node-proshot

Handy tool to capture website screenshots using Puppeteer.

## Installation

```
$ npm install node-proshot
```

## Usage


```js
const proshot = require('node-proshot');

proshot(URL, WHERE_TO_SAVE_FILE, CONFIG);
```

The `CONFIG` have following properties:

* `timeout`: duration to wait for AJAX loading to complete. Default to 5000 milliseconds.
* `viewport {width, height}`: the viewport to take screenshot. Default: 1280x720.

For examples:

```js
proshot('https://petehouston.com', 'petehouston.com.png', { 
    viewport: { 
        width: 1920,
        height: 1080
    },
    timeout: 2000 
});

proshot('https://petehouston.com', 'petehouston.com.png', { timeout: 2000 });

proshot('https://moso.com', 'moso.com.jpg');
```
