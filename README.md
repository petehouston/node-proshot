# node-proshot

Handy tool to capture website screenshots using Puppeteer.

## Installation

```
$ npm install node-proshot
```

## Usage


```js
const proshot = require('node-proshot');
```


## Take a screenshot for a website

```js
proshot.screenshot(URL, FILE_NAME_TO_SAVE, CONFIG);
```

The `CONFIG` have following properties:

* `timeout`: duration to wait for AJAX loading to complete. Default to 5000 milliseconds.
* `viewport {width, height}`: the viewport to take screenshot. Default: 1280x720.

For examples:

```js
proshot.screenshot('https://petehouston.com', 'petehouston.com.png', { 
    viewport: { 
        width: 1920,
        height: 1080
    },
    timeout: 2000 
});

proshot.screenshot('https://petehouston.com', 'petehouston.com.png', { timeout: 2000 });

proshot.screenshot('https://moso.com', 'moso.com.jpg');
```

## Take screenshots for multiple websites at a time

```js
proshot.multishot(URL_ARRAY, DIRECTORY_TO_SAVE, CONFIG);
```

* `URL_ARRAY` : the array of websites, should start with either `http` or `https`.
* `DIRECTORY_TO_SAVE`: this should be the folder where screenshots are stored. Default: directory where script is executed.
* `CONFIG`: have following properties:
  * `viewport`: viewport to take screenshots. Default: 1280x720.
  * `timeout` : duration to wait for AJAX loading to complete. Default to 5000 milliseconds.
  * `extension` : image file types. It could be `jpg` or `png`.

Examples:

```js
proshot.multishot([
    'https://petehouston.com',
    'https://apple.com',
    'https://youtube.com'
]);

proshot.multishot([
    'https://petehouston.com',
    'https://apple.com',
    'https://youtube.com'
], '/home/petehouston/screenshots');

proshot.multishot([
    'https://petehouston.com',
    'https://apple.com',
    'https://youtube.com'
], '/home/petehouston/screenshots', {
    viewport: { width: 1920, height: 1080 },
    timeout: 3000,
    extension: 'jpg'
});
```