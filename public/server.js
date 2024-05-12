$(document).ready(function () {
  // initiate
  load();
  function load() {
    load_data();
    load_leave();
    load_departments();
    load_signatories();
    load_employees();
    load_payroll();
    load_payroll_report();
  }

  function load_data() { // load table data for employees
    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: { action: 'fetch' },
      dataType: "JSON",
      success: function (data) {
        var html = '';
        if (data.data.length > 0) {
          for (var count = 0; count < data.data.length; count++) {
            html += `
                          <tr>
                              <td>`+ data.data[count].id + `</td>
                              <td>`+ data.data[count].fname + `</td>
                              <td>`+ data.data[count].mname + `</td>
                              <td>`+ data.data[count].lname + `</td>
                              <td>`+ data.data[count].address + `</td>
                              <td>`+ data.data[count].barangay + `</td>
                              <td>`+ data.data[count].province + `</td>
                              <td>`+ data.data[count].country + `</td>
                              <td>`+ data.data[count].zipcode + `</td>
                              <td>`+ data.data[count].dept_name + `</td>
                              <td>`+ data.data[count].role + `</td>
                              <td>`+ data.data[count].status + `</td>
                              <td><button type="button" class="btn btn-outline-info blur edit" data-id="`+ data.data[count].id + `">Edit</button>&nbsp;<button type="button" class="btn btn-outline-danger blur leave" data-id="` + data.data[count].id + `">Leave</button>&nbsp;<button type="button" class="btn btn-outline-danger delete" data-id="` + data.data[count].id + `">Delete</button></td>
                          </tr>
                          `;
          }
          $("input").val("");
        } else {
          html = '<tr><td colspan="13" class="text-center">No data found</td></tr>';
        }

        $('#employee_table tbody').html(html);
      }
    });
  }
  function load_leave() { // load table data for leave
    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: { action: 'fetchleave' },
      dataType: "JSON",
      success: function (data) {
        var html = '';
        if (data.data.length > 0) {
          for (var count = 0; count < data.data.length; count++) {
            var startDate = new Date(data.data[count].start_leave);
            var endDate = new Date(data.data[count].end_leave);
            var formattedStartDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            var formattedEndDate = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            html += `
                        <tr>
                            <td>`+ data.data[count].emp_id + `</td>
                            <td>`+ data.data[count].emp_lname + `, ` + data.data[count].emp_fname + ` ` + data.data[count].emp_mname + `</td>
                            <td>`+ formattedStartDate + `</td>
                            <td>`+ formattedEndDate + `</td>
                            <td>`+ data.data[count].leave_type + `</td>
                            <td>`+ data.data[count].superior_lname + `, ` + data.data[count].superior_fname + ` ` + data.data[count].superior_mname + `</td>
                            <td>`+ data.data[count].status + `</td>
                            <td><button type="button" class="btn blur btn-outline-info leaveedit" data-id="`+ data.data[count].leave_id + `">Edit</button>&nbsp;<button type="button" class="btn btn-outline-danger leavedelete" data-id="` + data.data[count].leave_id + `">Delete</button></td>
                        </tr>
                        `;
          }
          $("input").val("");
        } else {
          html = '<tr><td colspan="8" class="text-center">No data found</td></tr>';
        }

        $('#leave_table tbody').html(html);
      }
    });
  }
  function load_signatories() { // load table data for signatories
    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: { action: 'fetchsignatories' },
      dataType: "JSON",
      success: function (data) {
        var html = '';
        if (data.data.length > 0) {
          for (var count = 0; count < data.data.length; count++) { //<td><img src="`+ data.data[count].signature + `" alt="Image"></td>
            html += `
                        <tr>
                            <td>`+ data.data[count].id + `</td>
                            <td>`+ data.data[count].lname + `, ` + data.data[count].fname + ` ` + data.data[count].mname + `</td>
                            <td>`+ data.data[count].role + `</td>
                        </tr>
                        `;
          }

          $("input").val("");
        } else {
          html = '<tr><td colspan="4" class="text-center">No data found</td></tr>';
        }
        $('#signatories_table tbody').html(html);
      }
    });
  }
  function load_payroll() { // load table data for payroll
    $.ajax({
      url: "http://localhost:3000/employee/payslip",
      method: "POST",
      data: { action: 'Fetch' },
      dataType: "JSON",
      success: function (data) {
        var html = '';
        if (data.data.length > 0) {
          for (var count = 0; count < data.data.length; count++) { 
            var date = new Date(data.data[count].date_payroll);
            var startDate = new Date(data.data[count].start_payroll);
            var endDate = new Date(data.data[count].end_payroll);
            var formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            var formattedStartDate = startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            var formattedEndDate = endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            html += `
                        <tr>
                            <td>`+ data.data[count].id + `</td>
                            <td>`+ data.data[count].emp_id + `</td>
                            <td>`+ data.data[count].regular_pay + `</td>
                            <td>`+ data.data[count].overtime_pay + `</td>
                            <td>`+ data.data[count].pag_ibig + `</td>
                            <td>`+ data.data[count].SSS + `</td>
                            <td>`+ data.data[count].philHealth + `</td>
                            <td>`+ data.data[count].TIN + `</td>
                            <td>`+ formattedDate + `</td>
                            <td>`+ formattedStartDate + `</td>
                            <td>`+ formattedEndDate + `</td>
                            <td>`+ data.data[count].TotalDeductions + `</td>
                            <td>`+ data.data[count].NetPay + `</td>
                        </tr>
                        `;
          }

          $("input").val("");
        } else {
          html = '<tr><td colspan="4" class="text-center">No data found</td></tr>';
        }
        $('#payslip_table tbody').html(html);
      }
    });
  }
  function load_payroll_report() { // load table data for payroll
    $.ajax({
      url: "http://localhost:3000/employee/payslip",
      method: "POST",
      data: { action: 'Fetch' },
      dataType: "JSON",
      success: function (data) {
        reportGross = 0;
        reportNetPay = 0;
        reportDeductions = 0;

        for (var count = 0; count < data.data.length; count++) { 
          var item = data.data[count]
          reportGross += item.regular_pay + item.overtime_pay;
          reportNetPay += item.NetPay;
          reportDeductions += item.TotalDeductions;
        }

        $('#overall-gross').val(reportGross);
        $('#overall-net-pay').val(reportNetPay);
        $('#overall-deductions').val(reportDeductions);
      }
    });
  }

  function load_departments() { // load dropbox data for departments
    $.ajax({
      url: "http://localhost:3000/employee/departments",
      method: "GET",
      data: { action: 'fetchdept' },
      dataType: "JSON",
      success: function (response) {
        // Clear existing options
        $('#tdepartment').empty();
        $('#rdepartment').empty();
        $('#dept_select').empty();

        // Populate options with received data
        response.data.forEach(function (department) {
          $('#tdepartment').append('<option value="' + department.id + '">' + department.dept_name + '</option>');
          $('#rdepartment').append('<option value="' + department.id + '">' + department.dept_name + '</option>');
          $('#dept_select').append('<option value="' + department.id + '">' + department.dept_name + '</option>');
        });
      },
      error: function (xhr, status, error) {
        console.error("Failed to load departments:", error);
      }
    });
  }
  function load_superiors() { // load dropbox data for departments
    $.ajax({
      url: "http://localhost:3000/employee/superiors",
      method: "GET",
      data: { action: 'fetchsuperiors' },
      dataType: "JSON",
      success: function (response) {
        // Clear existing options
        $('#lsuperior').empty();
        $('#lesuperior').empty();

        // Populate options with received data
        response.data.forEach(function (superior) {
          $('#lsuperior').append('<option value="' + superior.id + '">' + superior.lname + `, ` + superior.fname + ` ` + superior.mname + '</option>');
          $('#lesuperior').append('<option value="' + superior.id + '">' + superior.lname + `, ` + superior.fname + ` ` + superior.mname + '</option>');
        });
      },
      error: function (xhr, status, error) {
        console.error("Failed to load departments:", error);
      }
    });
  }
  function load_roles(departmentId, selectRoleId) { // load dropbox data for roles
    $.ajax({
      url: "http://localhost:3000/employee/roles",
      method: "GET",
      data: { department_id: departmentId },
      dataType: "JSON",
      success: function (response) {
        $('#type_select').empty();
        $('#trole').empty();

        response.data.forEach(function (role) {
          $('#type_select').append('<option value="' + role.id + '">' + role.role + '</option>');
          $('#trole').append('<option value="' + role.id + '">' + role.role + '</option>');
        });

        $('#trole').val(selectRoleId);
      }
    });
  }
  function load_employees() { // load dropbox data for employees
    $.ajax({
      url: "http://localhost:3000/employee/employees",
      method: "GET",
      dataType: "JSON",
      success: function (response) {
        // Clear existing options
        $('#employeePayroll').empty();
        console.log(response);

        // Populate options with received data
        response.data.forEach(function (employee) {
          $('#employeePayroll').append('<option value="' + employee.id + '">' + employee.lname + `, ` + employee.fname + ` ` + employee.mname + '</option>');
        });
      },
      error: function (xhr, status, error) {
        console.error("Failed to load departments:", error);
      }
    });
  }

  $('#add_employee').click(function () { // insert new employee
    event.preventDefault();
    var formData = {
      first_name: $('#first_name').val(),
      middle_name: $('#middle_name').val(),
      last_name: $('#last_name').val(),
      address: $('#address').val(),
      barangay: $('#barangay').val(),
      province: $('#province').val(),
      country: $('#country').val(),
      zipcode: $('#zipcode').val(),
      department: $('#dept_select').val(),
      role: $('#type_select').val(),
      status: $('#status_select').val()
    };

    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: { action: 'Add', ...formData },
      dataType: "JSON",
      beforeSend: function () {
        $('#add_employee').attr('disabled', 'disabled');
      },
      success: function (response) {
        $('#add_employee').attr('disabled', false);

        load();

        setTimeout(function () {
          $('#message').html('');
        }, 5000);
      }
    });
  });

  $('#add_payslip').click(function () { // insert new payslip
    event.preventDefault();
    var formData = {
      id: $('#employeePayroll').val(),
      regular_pay: $('#regular-pay').val(),
      overtime_pay: $('#overtime-pay').val(),
      pag_ibig: $('#pag-ibig').val(),
      SSS: $('#SSS').val(),
      philHealth: $('#philHealth').val(),
      TIN: $('#TIN').val(),
      NetPay: $('#net-pay').val(),
      TotalDeductions: $('#total-deductions').val(),
      date_payroll: $('#date-payroll').val(),
      start_payroll: $('#start-payroll').val(),
      end_payroll: $('#end-payroll').val()
    };

    $.ajax({
      url: "http://localhost:3000/employee/payslip",
      method: "POST",
      data: { action: 'Add', ...formData },
      dataType: "JSON",
      beforeSend: function () {
        $('#add_payslip').attr('disabled', 'disabled');
      },
      success: function (response) {
        $('#add_payslip').attr('disabled', false);

        load();

        setTimeout(function () {
          $('#message').html('');
        }, 5000);
      }
    });
  });

  $(document).on('click', '.edit', function () { // edit modal show
    $('#department_form').hide();
    $('#sample_form').show();
    $('#leave_form').hide();
    $('#role_form').hide();
    $('#signatories_form').hide();
    $('#leave_edit_form').hide();

    var id = $(this).data('id');

    $('#dynamic_modal_title').text('Edit Data');

    $('#action').val('Edit');

    $('#action_button').text('Edit');

    $('#action_modal').modal('show');



    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: { id: id, action: 'fetch_single' },
      dataType: "JSON",
      success: function (data) {
        $('#tfirst_name').val(data.fname);
        $('#tmiddle_name').val(data.mname);
        $('#tlast_name').val(data.lname);
        $('#taddress').val(data.address);
        $('#tbarangay').val(data.barangay);
        $('#tprovince').val(data.province);
        $('#tcountry').val(data.country);
        $('#tzipcode').val(data.zipcode);
        $('#tdepartment').val(data.Role_DepartmentID);
        load_roles(data.Role_DepartmentID, data.Designation_RoleID);
        $('#tstatus').val(data.designation_status);
        $('#id').val(data.id);
      }
    });
  });
  $('#sample_form').on('submit', function (event) { // edit modal activate

    event.preventDefault();

    console.log($('#sample_form').serialize());

    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: $('#sample_form').serialize(),
      dataType: "JSON",
      beforeSend: function () {
        $('#action_button').attr('disabled', 'disabled');
      },
      success: function (data) {
        $('#action_button').attr('disabled', false);

        $('#message').html('<div class="alert alert-success">' + data.message + '</div>'); // no alert in this html

        $('#action_modal').modal('hide');

        load();

        setTimeout(function () {
          $('#message').html('');
        }, 5000);
      }
    });
  });

  $(document).on('click', '.deptbutt', function () { // department modal show
    $('#sample_form').hide();
    $('#role_form').hide();
    $('#leave_form').hide();
    $('#leave_edit_form').hide();
    $('#signatories_form').hide();
    $('#department_form').show();

    $('#department_form_title').text('Add Department');
    $('#deptaction').val('deptadd');
    $('#add_dept_butt').text('Add');
    $('#action_modal').modal('show');
  });
  $('#department_form').on('submit', function (event) { // department modal activate
    event.preventDefault();

    console.log($('#department_form').serialize());
    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: $('#department_form').serialize(),
      dataType: "JSON",
      beforeSend: function () {
        $('#add_dept_butt').attr('disabled', 'disabled');
      },
      success: function (data) {
        $('#add_dept_butt').attr('disabled', false);

        $('#message').html('<div class="alert alert-success">' + data.message + '</div>'); // no alert in this html

        $('#action_modal').modal('hide');

        load();

        setTimeout(function () {
          $('#message').html('');
        }, 5000);
      }
    });
  });

  $(document).on('click', '.rolebutt', function () { // Role modal show
    $('#sample_form').hide();
    $('#department_form').hide();
    $('#leave_form').hide();
    $('#leave_edit_form').hide();
    $('#signatories_form').hide();
    $('#role_form').show();
    load_departments();

    $('#role_form_title').text('Add Role');
    $('#roleaction').val('roleadd');
    $('#add_role_butt').text('Add');
    $('#action_modal').modal('show');
  });
  $('#role_form').on('submit', function (event) { // role modal activate
    event.preventDefault();

    console.log($('#role_form').serialize());
    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: $('#role_form').serialize(),
      dataType: "JSON",
      beforeSend: function () {
        $('#add_role_butt').attr('disabled', 'disabled');
      },
      success: function (data) {
        $('#add_role_butt').attr('disabled', false);
        $('#message').html('<div class="alert alert-success">' + data.message + '</div>'); // no alert in this html
        $('#action_modal').modal('hide');

        load();

        setTimeout(function () {
          $('#message').html('');
        }, 5000);
      }
    });
  });

  $(document).on('click', '.leave', function () { // leave modal show
    $('#sample_form').hide();
    $('#department_form').hide();
    $('#role_form').hide();
    $('#leave_edit_form').hide();
    $('#signatories_form').hide();
    $('#leave_form').show();

    load_superiors();

    var id = $(this).data('id');
    $('#lID').val(id);

    $('#leave_form_title').text('Request Leave');
    $('#leaveaction').val('leave');
    $('#leave_butt').text('Request');
    $('#action_modal').modal('show');

  });
  $('#leave_form').on('submit', function (event) { //leave modal activate
    event.preventDefault();

    var formData = {
      emp_id: $('#lID').val(),
      start_date: $('#lstartdate').val(),
      end_date: $('#lenddate').val(),
      type: $('#ltype').val(),
      superior: $('#lsuperior').val(),
      status: $('#lstatus').val()
    };
    console.log(formData);

    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: { action: 'leave', ...formData },
      dataType: "JSON",
      beforeSend: function () {
        $('#leave_butt').attr('disabled', 'disabled');
      },
      success: function (data) {
        $('#leave_butt').attr('disabled', false);
        $('#action_modal').modal('hide');
        load();
        setTimeout(function () {
          $('#message').html('');
        }, 5000);
      }
    });
  });

  $(document).on('click', '.leaveedit', function () { // leave edit modal show
    $('#sample_form').hide();
    $('#department_form').hide();
    $('#role_form').hide();
    $('#leave_form').hide();
    $('#signatories_form').hide();
    $('#leave_edit_form').show();
    load_superiors();
    var id = $(this).data('id');
    $('#leave_form_edit_title').text('Edit Leave');
    $('#leaveeditaction').val('leaveedit');
    $('#leave_edit_butt').text('Edit');
    $('#action_modal').modal('show');

    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: { id: id, action: 'fetchleave_single' },
      dataType: "JSON",
      success: function (data) {
        var startDate = new Date(data.start_leave);
        var endDate = new Date(data.end_leave);
        startDate.setDate(startDate.getDate() + 1);
        endDate.setDate(endDate.getDate() + 1);
        var formattedStartDate = startDate.toISOString().substring(0, 10);
        var formattedEndDate = endDate.toISOString().substring(0, 10);

        $('#empleaveID').val(data.emp_id);
        $('#leID').val(data.leave_id);
        $('#lestartdate').val(formattedStartDate);
        $('#leenddate').val(formattedEndDate);
        $('#letype').val(data.leave_type);
        $('#lesuperior').val(data.superior_id);
        $('#lestatus').val(data.status);
      }
    });
  });
  $('#leave_edit_form').on('submit', function (event) { //leave edit activate 
    event.preventDefault();
    var id = $('#leID').val();
    var formData = {
      id: id,
      start_date: $('#lestartdate').val(),
      end_date: $('#leenddate').val(),
      type: $('#letype').val(),
      status: $('#lestatus').val()
    };
    console.log(formData);

    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: { action: 'leaveedit', ...formData },
      dataType: "JSON",
      beforeSend: function () {
        $('#leave_edit_butt').attr('disabled', 'disabled');
      },
      success: function (data) {
        $('#leave_edit_butt').attr('disabled', false);

        $('#message').html('<div class="alert alert-success">' + data.message + '</div>'); // no alert in this html

        $('#action_modal').modal('hide');

        load();

        setTimeout(function () {
          $('#message').html('');
        }, 5000);
      }
    });
  });

  $(document).on('click', '.signatoriesbutt', function () { // signatories modal show
    $('#sample_form').hide();
    $('#department_form').hide();
    $('#leave_form').hide();
    $('#leave_edit_form').hide();
    $('#role_form').hide();
    $('#signatories_form').show();
    load_employees();

    $('#signatories_form_title').text('Add Signatory');
    $('#signatoriesaction').val('signatoriesadd');
    $('#add_signatories_butt').text('Add');
    $('#action_modal').modal('show');
  });
  $('#signatories_form').on('submit', function (event) { //signatories modal activate 
    event.preventDefault();

    console.log($('#signatories_form').serialize());

    $.ajax({
      url: "http://localhost:3000/employee/action",
      method: "POST",
      data: $('#signatories_form').serialize(),
      dataType: "JSON",
      beforeSend: function () {
        $('#signatories_butt').attr('disabled', 'disabled');
      },
      success: function (data) {
        $('#signatories_butt').attr('disabled', false);

        $('#message').html('<div class="alert alert-success">' + data.message + '</div>'); // no alert in this html

        $('#action_modal').modal('hide');

        load();

        setTimeout(function () {
          $('#message').html('');
        }, 5000);
      }
    });
  });


  $('#dept_select').change(function () { // load roles upon choosing department
    var departmentId = $(this).val();

    if (departmentId) {
      load_roles(departmentId, 0);
    } else {
      $('#type_select').empty().prop('disabled', true);
    }
  });
  $('#tdepartment').change(function () { // load roles upon choosing department
    var departmentId = $(this).val();

    if (departmentId) {
      load_roles(departmentId, 0);
    } else {
      $('#trole').empty().prop('disabled', true);
    }
  });

  $(document).on('click', '.delete', function () { // delete employee
    var id = $(this).data('id');
    if (confirm("Are you sure you want to delete this data?")) {
      $.ajax({
        url: "http://localhost:3000/employee/action",
        method: "POST",
        data: { action: 'delete', id: id },
        dataType: "JSON",
        success: function (data) {
          $('#message').html('<div class="alert alert-success">' + data.message + '</div>');
          load();
          setTimeout(function () {
            $('#message').html('');
          }, 5000);
        }
      });
    }
  });

  $(document).on('click', '.leavedelete', function () { // delete leave
    var id = $(this).data('id');

    if (confirm("Are you sure you want to delete this data?")) {
      $.ajax({
        url: "http://localhost:3000/employee/action",
        method: "POST",
        data: { action: 'leavedelete', id: id },
        dataType: "JSON",
        success: function (data) {
          load();
          setTimeout(function () {
            $('#message').html('');
          }, 5000);
        }
      });
    }
  });
});