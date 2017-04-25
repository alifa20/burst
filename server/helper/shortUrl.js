const rp = require('request-promise');
const _ = require('lodash');

function pickUrlFromMessage(message) {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    const testUrl = message.match(regex);
    onlyUrl = testUrl && testUrl[0];
    return onlyUrl;
}

const token = '391aef2a8115ca637264f37472e2bd52b10ba60a';
function bitly(longUrl) {
    const uri = `https://api-ssl.bitly.com/v3/shorten?access_token=${token}&longUrl=${longUrl}`;
    const options = {
        uri,
        method: 'POST',
        formData: { longUrl, access_token: token },
    };
    return rp(options);
}

function replaceUrl(message) {
    url = pickUrlFromMessage(message);
    return bitly(url)
        .then(bitlyUrl => {
            const jBitly = JSON.parse(bitlyUrl);
            return _.has(jBitly, 'data.url') ?
                message.replace(url, jBitly.data.url) : message;
        });
}

module.exports = {
    pickUrlFromMessage,
    bitly,
    replaceUrl,
};