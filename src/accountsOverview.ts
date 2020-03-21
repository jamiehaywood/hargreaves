import * as cheerio from 'cheerio'

export default function accountsOverview(body: any) {
    const $ = cheerio.load(body)

    function parseAccountRow(elem: CheerioElement) {
        let row: string[] = [];
        let href: string = "";

        $("td a", elem).each((n, link) => {
            row.push($(link).text().trim());
            href = href || link.attribs.href;
        });
        return {
            name: row[0],
            value: {
                "totalValue": Number(row[1].replace(/[^0-9.-]+/g, "")),
                "cash": Number(row[2].replace(/[^0-9.-]+/g, "")),
                "investments": Number(row[1].replace(/[^0-9.-]+/g, "")) - Number(row[2].replace(/[^0-9.-]+/g, "")),
                "link": href
            }
        };
    }

    let accountsInfo: { [index: string]: any } = {}
    $('table[class="accounts-table"] tbody tr').each((i, elem) => {
        let row = parseAccountRow(elem);
        accountsInfo[row.name] = row.value;
    });

    return accountsInfo
}
