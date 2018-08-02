
const normalizeUrl = (url) => {
    if(!url.startsWith('http') && !url.startWith('https')) {
        return 'http://' + url;
    }

    return url;
}

module.exports = normalizeUrl;