const request = require('request');
const cheerio = require('cheerio');

const config = require('../config');

function getSearchURL(term) {
    return config.BASE_URL + config.SEARCH_URL + term.split(' ').map(s => encodeURIComponent(s)).join('+');
}

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        request({
            uri: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'
            }
        }, (err, res, body) => {
            if (err != null) {
                reject((typeof err !== 'object') ? new Error(err) : err);
                return;
            }

            // if the request was not a success for some reason
            if (res.statusCode.toString()[0] !== '2') {
                reject(new Error('Status Code ' + res.statusCode));
                return;
            }

            resolve(body);
        });
    })
}

async function findFirstSearchResult(term) {
    let body;
    try {
        body = await makeRequest(getSearchURL(term));
    }
    catch (e) {
        throw e;
    }

    const $ = cheerio.load(body);

    const grid = $('.entry-grid-body');
    const searchItem = grid.find('tr td a')[0];

    return config.BASE_URL + searchItem.attribs.href;
}

function childrenToText(children) {
    let text = '';

    for (const child of children) {
        if (child.type === 'text') {
            text += child.data;
            continue;
        }

        text += childrenToText(child.children);
    }

    return text;
}

async function doSearch(term) {
    let resultUrl;
    try {
        resultUrl = await findFirstSearchResult(term);
    } catch (e) {
        throw e;
    }

    let body;
    try {
        body = await makeRequest(resultUrl);
    } catch (e) {
        throw e;
    }

    const $ = cheerio.load(body);

    const about = $('.bodycopy').find('p')[0];

    return childrenToText(about.children);
}

module.exports = doSearch;