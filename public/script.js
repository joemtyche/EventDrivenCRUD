$(document).ready(function () {
    // Change div lists
  var employeeDivBtn = $(".employee-list-btn");
  var leaveDivBtn = $(".leave-list-btn");
  var signatoriesBtn = $(".signatories-list-btn");
  var employeeDiv = $(".employee-list-container");
  var leaveDiv = $(".leave-list-container");
  var signatoriesDiv = $(".signatories-list-container");
  var overallPayrollBtn = $(".overall-payroll-btn");
  var payrollDiv = $(".payroll-container");
  var payrollListBtn = $(".payroll-list-btn");
  var payrollOverallBtn = $(".overall-payroll-btn");
  var overallPayrollDiv = $(".overall-payroll-div");

  employeeDivBtn.on("click", function () {
    employeeDiv.css("display", "block");
    leaveDiv.css("display", "none");
    signatoriesDiv.css("display", "none");
    employeeDivBtn.addClass("active");
    leaveDivBtn.removeClass("active");
    signatoriesBtn.removeClass("active");
  });

  leaveDivBtn.on("click", function () {
    leaveDiv.css("display", "block");
    employeeDiv.css("display", "none");
    signatoriesDiv.css("display", "none");
    employeeDivBtn.removeClass("active");
    leaveDivBtn.addClass("active");
    signatoriesBtn.removeClass("active");
  });

  signatoriesBtn.on("click", function () {
    signatoriesDiv.css("display", "block");
    leaveDiv.css("display", "none");
    employeeDiv.css("display", "none");
    employeeDivBtn.removeClass("active");
    leaveDivBtn.removeClass("active");
    signatoriesBtn.addClass("active");
  });

  overallPayrollBtn.on("click", function () {
    payrollDiv.css("display", "none");
    payrollListBtn.removeClass("active");
    payrollOverallBtn.addClass("active");
    overallPayrollDiv.removeClass("inactive");
    overallPayrollDiv.css("display", "block");
  });

  payrollListBtn.on("click", function () {
    payrollDiv.css("display", "block");
    payrollListBtn.addClass("active");
    payrollOverallBtn.removeClass("active");
    overallPayrollDiv.addClass("inactive");
    overallPayrollDiv.css("display", "none");
  });

  // Leave-btn-modal
  var exitModal = $(".exit-modal");
  var leaveModalContainer = $(".leave-modal-container");
  var leaveModal = $(".leave-modal");
  var overlay = $(".overlay");
  var signatoriesModalContainer = $(".signatories-modal-container");
  var signatoriesModal = $(".singatories-modal");

  // Exit modal
  exitModal.on("click", function () {
    leaveModal.css("display", "none");
    leaveModalContainer.css("display", "none");
    signatoriesModal.css("display", "none");
    signatoriesModalContainer.css("display", "none");
    overlay.css("display", "none");
  });

  overlay.on("click", function () {
    leaveModal.css("display", "none");
    leaveModalContainer.css("display", "none");
    overlay.css("display", "none");
    signatoriesModal.css("display", "none");
    signatoriesModalContainer.css("display", "none");
  });

  // Show modal
  $("body").on("click", ".btn-leave", function () {
    leaveModal.css("display", "block");
    leaveModalContainer.css("display", "block");
    overlay.css("display", "block");
  });

  $("body").on("click", ".add-signatories-btn", function () {
    signatoriesModalContainer.css("display", "block");
    signatoriesModal.css("display", "block");
    overlay.css("display", "block");
  });
});