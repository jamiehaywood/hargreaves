import { parseSecurityToken } from '../utils/parseSecurityToken';
import { stageOneMockHtml } from './__mocks__/stage-one-login-mock-html';

describe('Parse Security Token', () => {
  it('correctly parses HLVT token from html', () => {
    expect(parseSecurityToken(stageOneMockHtml)).toBe('1670432745');
  });

  it('throws error if HLVT cannot be parsed', () => {
    expect(() => parseSecurityToken('HTML-Without-VT-Token')).toThrowError(
      new Error('Unable to parse HL_VT')
    );
  });
});
