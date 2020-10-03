import cheerio from 'cheerio';

export const parseSecurityToken = (stageOneHTML: string) => {
  const hl_vt = cheerio.load(stageOneHTML)('input[name="hl_vt"]').val();
  if (hl_vt) return hl_vt;
  throw new Error('Unable to parse HL_VT');
};
