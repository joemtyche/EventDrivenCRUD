$("#regular-pay").change(function () {
  callGrossEarnings();
  classDeductions();
});

$("#overtime-pay").change(function () {
  callGrossEarnings();
  classDeductions();
});

var regularPay = $("#regular-pay");
var overtimePay = $("#overtime-pay");
var grossEarnings = $("#gross-earnings");
var pagIbig = $("#pag-ibig");
var SSS = $("#SSS");
var philHealth = $("#philHealth");
var TIN = $("#TIN");
var totalDeductions = $("#total-deductions");
var netPay = $("#net-pay");

var totalGrossEarnings = 0;
var pagIbigValue = 0;
var sssValue = 0;
var philHealthValue = 0;
var totalDeductionsValue = 0;
var netPayValue = 0;

function callGrossEarnings() {
  if (regularPay.val() == "") {
    return false;
  } else if (overtimePay.val() == "") {
    return false;
  } else {
    totalGrossEarnings = Number(regularPay.val()) + Number(overtimePay.val());

    grossEarnings.val(totalGrossEarnings.toFixed(2));
  }
}

function classDeductions() {
  if (regularPay.val() == "") {
    return false;
  } else if (overtimePay.val() == "") {
    return false;
  } else {
    totalGrossEarnings = Number(regularPay.val()) + Number(overtimePay.val());
    pagIbigValue = (totalGrossEarnings)*0.02;
    sssValue = (totalGrossEarnings)*0.045;
    philHealthValue = (totalGrossEarnings)*0.05;

    totalDeductionsValue = pagIbigValue + sssValue + philHealthValue + 500;

    netPayValue = totalGrossEarnings - totalDeductionsValue;

    pagIbig.val(pagIbigValue.toFixed(2));
    SSS.val(sssValue.toFixed(2));
    philHealth.val(philHealthValue.toFixed(2));
    TIN.val(500);
    totalDeductions.val(totalDeductionsValue.toFixed(2))
    netPay.val(netPayValue.toFixed(2));
  }
}

