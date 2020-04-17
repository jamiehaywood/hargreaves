import request from "../requestInstance";

export const getRequiredSecureNumbers = async () => {
  let response = await request.get(
    "https://online.hl.co.uk/my-accounts/login-step-two",
    { followRedirect: true }
  );

  const $ = cheerio.load(response.body);

  let secureNumbers = [
    parseInt(
      $("#secure-number-1")
        .attr("title")
        ?.match(/[0-9]/g)![0]
    ) - 1,

    parseInt(
      $("#secure-number-2")
        .attr("title")
        ?.match(/[0-9]/g)![0]
    ) - 1,

    parseInt(
      $("#secure-number-3")
        .attr("title")
        ?.match(/[0-9]/g)![0]
    ) - 1
  ];

  return secureNumbers;
};
