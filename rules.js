var _ = require("lodash");

const isCodeApplicable = function (cd, td, oc) {
  //console.log("Inside rule1");
  if (oc.termsFilter.channel.includes(td.channel)) return rule2(cd, td, oc);
  else
    return {
      requestID: "1",
      codeType: "D",
      validFor: "RC",
      codeName: "STUDENT",
      applicable: "N",
      message: `Channel 'PORTAL' is Not Applicable for STUDENT,  Aviailable Channels ["branch","mobile"]`,
    };
};

const rule2 = function (cd, td, oc) {
  //console.log("Inside rule2");
  if (oc.termsFilter.transTypeCode.includes(td.transTypeCode)) return true;
  else
    return {
      requestID: "1",
      codeType: "D",
      validFor: "RC",
      codeName: "STUDENT",
      applicable: "N",
      message: `Transaction Type SVC-R is not Applicable for STUDENT, Available Transaction Types ["CN-SALE","SVC-S","TT-SALE","DD-SALE"]`,
    };
};

const rule3 = function (cd, td, oc) {
  //console.log("Inside rule3");
  if (
    _.intersection(oc.termsFilter.customerCategory, td.customerCategory)
      .length > 0
  )
    return rule3(cd, td, oc);
  else
    return {
      requestID: "1",
      codeType: "D",
      validFor: "RC",
      codeName: "STUDENT",
      applicable: "N",
      message: `Customer Category ["EMPLOYEE",   "WEALTH"]" is Not Applicable Student Available Customer Categories`,
    };
};

const rule4 = function (cd, td, oc) {
  //console.log("Inside rule4");
  let cur = [];
  _.forEach(oc3.termsFilter.currency, (currency) => {
    cur.push(currency.currCode);
  });
  if (cur.includes(td3.currency)) return rule5(cd, td, oc);
  else
    return {
      requestID: "1",
      codeType: "D",
      validFor: "RC",
      codeName: "STUDENT",
      applicable: "N",
      message: `Currency USD is Not Applicable STUDENT Available Currencies  [{"currCode":"INR","minAmount":"","maxAmount":"","discount":""},{"currCode":"EUR","minAmount":"","maxAmount":"","discount":""},{"currCode":"GBP","minAmount":"","maxAmount":"","discount":""}]`,
    };
};

const rule5 = function (cd, td, oc) {
  let condition = false;
  if (oc.minMaxAmountType == "LCY") {
    if (
      td.lcyAmount >= oc.minimumINRAmount &&
      td.lcyAmount <= oc.maximumINRAmount
    ) {
      condition = true;
      return rule6(cd, td, oc);
    }
  }
  if (!condition)
    return {
      requestID: "1",
      codeType: "D",
      validFor: "RC",
      codeName: "STUDENT",
      applicable: "N",
      message:
        "LCY Amount 115965 is Not with in Range STUDENT Range is form 1000",
    };
};

const rule6 = function (cd, td, oc) {
  let condition = false;

  if (oc.minMaxAmountType == "FCY") {
    if (
      td.lcyAmount >= oc.minimumINRAmount / td.rate &&
      td.lcyAmount <= oc.maximumINRAmount / td.rate
    ) {
      condition = true;
      return rule7(cd, td, oc);
    }
  }
  if (!condition)
    return {
      requestID: "1",
      codeType: "D",
      validFor: "RC",
      codeName: "STUDENT",
      applicable: "N",
      message: "FCY Amount",
    };
};

const rule7 = function (cd, td, oc) {
  if (
    Date.parse(td.transDate) >= Date.parse(oc.startDateTime) &&
    Date.parse(td.transDate) <= Date.parse(oc.endDateTime)
  )
    return rule8(cd, td, oc);
  else
    return {
      codeType: "D",
      validFor: "RC",
      codeName: "STUDENT",
      applicable: "N",
      message:
        "Transaction Date 1/03/2020 is Not Within Range Student Range is form 01-05-2020 00:00:00 to 01-07-2020 00:00:00 ",
    };
};

const rule8 = function (cd, td, oc) {
  let condition = true;
  let cur = [];
  _.forEach(cd.usedCodes, (code) => {
    cur.push(code.usedCount);
  });
  console.log(cur);
  for (let i = 0; i < cur.length; i++) {
    if (oc.maximumUsagePerCustomer < cur[i]) {
      condition = false;
      break;
    }
  }
  if (condition)
    return {
      requestID: "1",
      codeType: "D",
      validFor: "RC",
      codeName: "STUDENT",
      applicable: "Y",
      message: "",
    };
  else
    return {
      codeType: "D",
      validFor: "RC",
      codeName: "STUDENT",
      applicable: "N",
      message:
        "Customer has already used  maximim no of usages  (selectedOfferCode.maximumUsagePerCustomer) available for offer code <selectedOfferCode.codeName>",
    };
};

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

module.exports = {
  isCodeApplicable,
  rule2,
  rule3,
  rule4,
  rule5,
  rule6,
  rule7,
  rule8,
};

/*
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
console.log(isCodeApplicable(cd, td, oc));
*/
