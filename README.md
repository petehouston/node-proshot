# node-proshot

Handy tool to capture website screenshots using Puppeteer.

## Installation

```
$ npm install node-proshot
```

## Usage

### CLI

Install as global command.

```
$ npm i -g node-proshot
```

To take screenshot of a website, use `proscreenshot`

```
    Usage
        $ proscreenshot <url> <filename> 

    Options
        --viewport : Set viewport for screenshot, 'WIDTH:HEIGHT'. Default: '1280:720'.
        --timeout  : Set time to wait for complete ajax loading in milliseconds. Default: 5000.

    Example
        $ proscreenshot --viewport=1920:1080 petehouston.com petehouston.com.png
        $ proscreenshot --timeout=6000 petehouston.com petehouston.com.png
```

To take screenshots for multiple websites in a session, use `promultishot`. Use can also use `proscreenshot`, but `promultishot` is more efficient.

```
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
```


### API
```js
const proshot = require('node-proshot');
```


### Take a screenshot for a website

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

### Take screenshots for multiple websites at a time

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