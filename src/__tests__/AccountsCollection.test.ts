import { myAccountsMock } from "./__mocks__/my-accounts-mock";

describe("some stuff", () => {
  const accountsPage = myAccountsMock(
    "1,000.00",
    "50.00",
    "0.00",
    "0.00",
    "0.00",
    "0.00",
    "50,000.00",
    "0.00",
    "51,050.00",
    "50.00",
    "20,000.00",
    "10.00"
  );
  it("correctly parses accounts collection", () => {

  });
});
