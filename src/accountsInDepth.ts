import * as cheerio from 'cheerio'

export function getAccountURLs(html: string) {
    let $ = cheerio.load(html)

    return $('table[class="accounts-table"] tbody tr')
        .find('td:nth-child(1) a')
        .toArray()
        .map(element => $(element).attr('href'));
};