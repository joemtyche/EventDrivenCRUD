$(document).ready(function () {
    var employeeDivBtn = $(".employee-list-btn");
    var leaveDivBtn = $(".leave-list-btn");
    var signatoriesBtn = $(".signatories-list-btn");
    var employeeDiv = $(".employee-list-container");
    var leaveDiv = $(".leave-list-container");
    var signatoriesDiv = $(".signatories-list-container");
  
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
  
    // Leave-btn-modal
    var exitModal = $(".exit-modal");
    var leaveModalContainer = $(".leave-modal-container");
    var leaveModal = $(".leave-modal");
    var overlay = $(".overlay");
    var signatoriesModalContainer = $(".signatories-modal-container");
    var signatoriesModal = $(".signatories-modal");
    var signatoriesForm = $('#signatories-form');
    var actionModal = $('#action_modal');
    var leaveEdit = $('.leaveedit');
  
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
        signatoriesForm.css('display', 'none');
    });
  
    actionModal.on('click', function(){
        leaveModal.css("display", "none");
        leaveModalContainer.css("display", "none");
        overlay.css("display", "none");
        signatoriesModal.css("display", "none");
        signatoriesModalContainer.css("display", "none");
        signatoriesForm.css('display', 'none');
    })
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
  
    $("body").on("click", ".blur", function () {
        overlay.css("display", "block");

    });
  });
  