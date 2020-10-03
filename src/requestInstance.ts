import got from 'got';
import { CookieJar } from 'tough-cookie';

let cookieJar = new CookieJar();

cookieJar.setCookieSync('jsCheck=yes; path=/', 'https://hl.co.uk');

const request = got.extend({
  cookieJar: cookieJar,
  followRedirect: false,
});

const clearCookieJar = async () => {
  cookieJar.removeAllCookies();
};

export default request;
export { clearCookieJar };
