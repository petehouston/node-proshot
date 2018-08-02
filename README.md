# node-proshot

Handy tool to capture website screenshots using Puppeteer.

## Installation

```
$ npm install node-proshot
```

## Usage


```js
const proshot = require('node-proshot');

proshot(url, path_to_save_file, {
    timeout: milliseconds // default to 5000, which equals to 5 seconds
});
```

For examples:

```js
proshot('https://petehouston.com', 'petehouston.com.png', { timeout: 2000 });

proshot('https://moso.com', 'moso.com.jpg');
```
