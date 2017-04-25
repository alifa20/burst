// test/server.test.js
const exec = require('mz/child_process').exec;
const request = require('supertest-as-promised');
const assert = require('assert');
const expect = require('chai').expect;

const shortUrl = require('../helper/shortUrl');

describe('#Pick', () => {
    it('should pick url in a message without http', () => {
        const msg = 'random messgae with a www.google.com url ';
        const url = shortUrl.pickUrlFromMessage(msg);
        assert.equal(url, 'www.google.com')
    });
    it('should pick url in a message with https', () => {
        const msg = 'random messgae with a https://www.google.com url ';
        const url = shortUrl.pickUrlFromMessage(msg);
        assert.equal(url, 'https://www.google.com')
    });
    it('should pick url in a message with http', () => {
        const msg = 'random messgae with a http://www.google.com url ';
        const url = shortUrl.pickUrlFromMessage(msg);
        assert.equal(url, 'http://www.google.com')
    });
});
