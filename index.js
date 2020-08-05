var _ = require("lodash");
let cd = {
  cif: "12345",
  customerCategory: ["EMPLOYEE", "WEALTH"],
  usedCodes: [
    {
      codeType: "P",
      codeName: "KOTAKFIRST",
      usedCount: "1",
    },
    {
      codeType: "D",
      codeName: "STUDENT",
      usedCount: "2",
    },
  ],
};
let td = {
  requestID: 1,
  transDate: "01-04-2020",
  transTypeCode: "SVC-R",
  currency: "USD",
  amount: 1500,
  promoCode: "KOTAKFIRST",
  channel: "PORTAL",
  rate: 77.31,
  ibr: 75.31,
  cardRate: 77.31,
  perUnit: 1,
  buySellSign: -1,
  orgCharges: 100,
  lcyAmount: 115965,
};
let oc = {
  codeType: "D",
  validFor: "RC",
  codeName: "STUDENT",
  description:
    " DISCOUNT FOR EDUCATIONAL SEASON- CHARGES Rs 100 OFF, 50 PAISE DISCOUNT ON CARD RATE",
  startDateTime: "01-04-2020 00:00:00",
  endDateTime: "01-07-2020 00:00:00",
  minMaxAmountType: "LCY",
  minimumINRAmount: "1000",
  maximumINRAmount: "1000000",
  maximumTotalUsage: "100000",
  maximumUsagePerCustomer: "1",
  rateApplyType: "GBL",
  applicableRateMargin: "50",
  chargesDiscount: {
    chargeDiscountType: "F",
    chargeDiscount: "100",
  },
  rateDiscount: {
    rateDiscountType: "F",
    rateDiscountOn: "IBR",
    rateDiscountOrMargin: "50",
  },
  termsFilter: {
    channel: ["branch", "mobile"],
    transTypeCode: ["CN-SALE", "SVC-S", "SVC-R", "TT-SALE", "DD-SALE"],
    customerCategory: ["STUDENT", "EMPLOYEE"],
    currency: [
      {
        currCode: "USD",
        minAmount: "",
        maxAmount: "",
        discount: "",
      },
      {
        currCode: "EUR",
        minAmount: "",
        maxAmount: "",
        discount: "",
      },
      {
        currCode: "GBP",
        minAmount: "",
        maxAmount: "",
        discount: "",
      },
    ],
  },
};

let rule7 = function (cd, td, oc) {
  console.log("7");
  return rule6(cd, td, oc);
};

let rule6 = function (cd, td, oc) {
  console.log("6");
  return "Hello", cd;
};

let rule8 = function (cd, td, oc) {
  console.log("8");
  return rule7(cd, td, oc);
};

//console.log(rule8(cd, td, oc));
console.log("Hello");

module.exports = {
  rule6,
  rule7,
  rule8,
};
