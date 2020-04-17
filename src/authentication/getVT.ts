import * as cheerio from "cheerio";
import request from "../requestInstance";

export const getVT = async () => {
  let response = (
    await request.get("https://online.hl.co.uk/my-accounts/login-step-one")
  ).body;

  return cheerio
    .load(response)('input[name="hl_vt"]')
    .val();
};
