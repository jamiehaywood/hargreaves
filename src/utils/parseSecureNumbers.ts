import cheerio from 'cheerio';

export const parseSecureNumbers = (stageTwoHTML: string) => {
  const $ = cheerio.load(stageTwoHTML);
  const numRegex = /[0-9]/;

  return ['#secure-number-1', '#secure-number-2', '#secure-number-3']
    .map((selector) => {
      const titleAttr = $(selector).attr('title');
      if (titleAttr) {
        return parseInt(numRegex.exec(titleAttr)![0]) - 1;
      } else {
        throw new Error('Unable to parse secure numbers');
      }
    })
    .flat();
};
