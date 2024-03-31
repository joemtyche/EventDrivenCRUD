var express = require('express');
var router = express.Router();
var database = require('../database');

router.get("/", function (request, response, next) {
  response.render('employee', { title: 'Employee Management System' });
});

router.get("/departments", function (request, response, next) {
  const query = 'SELECT * FROM Department';

  database.query(query, function (error, data) {
    if (error) {
      console.error('Database Error:', error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }else {
      response.json({ data });
    }
  });
});
router.get("/roles", function (request, response, next) {
  const departmentId = request.query.department_id;
  
  const query = 'SELECT * FROM Role WHERE dept_id = ?';

  database.query(query, [departmentId],function (error, data) {
    if (error) {
      console.error('Database Error:', error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }else {
      response.json({ data });
    }
  });
});
router.get("/employees", function (request, response, next) {
  const query = 'SELECT * FROM Employee';

  database.query(query, function (error, data) {
    if (error) {
      console.error('Database Error:', error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }else {
      response.json({ data });
    }
  });
});

router.post("/action", function (request, response, next) {
  var action = request.body.action;

  // employee
  if (action == 'fetch') {
    const query = `
			SELECT 
				e.id as id,
				e.fname AS fname,
				e.lname AS lname,
				e.mname AS mname,
				e.address AS address,
				e.barangay AS barangay,
				e.province AS province,
				e.country AS country,
				e.zipcode AS zipcode,
				d.dept_name AS dept_name,
				d.status AS dept_status,
				r.role AS role,
				r.dept_id AS Role_DepartmentID,
				des.emp_id AS Designation_EmployeeID,
				des.role_id AS Designation_RoleID,
				des.status AS status
			FROM 
				Employee e
			JOIN 
				Designation des ON des.emp_id = e.id
			JOIN 
				Role r ON r.id = des.role_id
			JOIN 
				Department d ON d.id = r.dept_id;
		`;

    database.query(query, function (error, data) {
      if (error) {
        console.error('Database Error:', error);
        response.status(500).json({
          error: 'Internal Server Error'
        });
      } else {
        // Sort the data by employee ID in ascending order
        data.sort((a, b) => a.Designation_EmployeeID - b.Designation_EmployeeID);

        // Process the sorted data as needed
        response.json({
          data: data
        });
      }
    });
  }
  if (action == 'Add') {
    var first_name = request.body.first_name;
    var middle_name = request.body.middle_name;
    var last_name = request.body.last_name;
    var address = request.body.address;
    var barangay = request.body.barangay;
    var province = request.body.province;
    var country = request.body.country;
    var zipcode = parseInt(request.body.zipcode);
    var role = request.body.role; 
    var status = request.body.status;

    var employeeQuery = "INSERT INTO Employee (fname, mname, lname, address, barangay, province, country, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    var employeeValues = [first_name, middle_name, last_name, address, barangay, province, country, zipcode];

    database.query(employeeQuery, employeeValues, function (error, data) {
      if (error) {
        console.error('Database Error:', error);
        response.status(500).json({
          error: 'Internal Server Error'
        });
      }

      var empId = data.insertId;

      var designationQuery = "INSERT INTO Designation (emp_id, role_id, status) VALUES (?, ?, ?)"; // NEEDS MASSIVE FIXING
      var designationValues = [empId, role, status];

      database.query(designationQuery, designationValues, function (error) {
        if (error) {
          console.log("Error inserting into Designation table:", error);
          return;
        }
        console.log("Data inserted successfully");

        response.status(200).json({ message: 'Employee added successfully' });
      });
    });
  }
  if(action == 'fetch_single')
  {
  	var id = request.body.id;

  	var query = `
    SELECT 
      e.id as id,
      e.fname AS fname,
      e.lname AS lname,
      e.mname AS mname,
      e.address AS address,
      e.barangay AS barangay,
      e.province AS province,
      e.country AS country,
      e.zipcode AS zipcode,
      d.dept_name AS dept_name,
      d.status AS dept_status,
      r.role AS role,
      r.dept_id AS Role_DepartmentID,
      des.emp_id AS Designation_EmployeeID,
      des.role_id AS Designation_RoleID,
      des.status AS designation_status
    FROM 
      Employee e
    JOIN 
      Designation des ON des.emp_id = e.id
    JOIN 
      Role r ON r.id = des.role_id
    JOIN 
      Department d ON d.id = r.dept_id
    WHERE 
      e.id = "${id}";
    `;

    console.log(id)
  	database.query(query, function(error, data){

  		response.json(data[0]);

  	});
  }
  if(action == 'Edit')
  {
  	var id = request.body.id;
  	var first_name = request.body.first_name;
    var middle_name = request.body.middle_name;
  	var last_name = request.body.last_name;
  	var address = request.body.address;
  	var barangay = request.body.barangay;
  	var province = request.body.province;
  	var country = request.body.country;
  	var zipcode = request.body.zipcode;
  	var role = request.body.role;
  	var status = request.body.status;

  	var employeeQuery = `
            UPDATE Employee 
            SET fname = ?, 
                mname = ?, 
                lname = ?, 
                address = ?,
                barangay = ?,
                province = ?,
                country = ?,
                zipcode = ?
            WHERE id = ?`;
    var employeeValues = [first_name, middle_name, last_name, address, barangay, province, country, zipcode, id];

    var designationQuery = `
                      UPDATE Designation 
                      SET role_id = ?,
                          status = ?
                      WHERE emp_id = ?`;
    var designationValues = [role, status, id]; // NEEDS MASSIVE FIXING

    database.beginTransaction(function(err) {
      if (err) { 
          console.error('Database Error:', err);
          response.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      
      database.query(employeeQuery, employeeValues, function(error, employeeResult) {
          if (error) {
              console.error('Error updating Employee table:', error);
              // Rollback the transaction
              database.rollback(function() {
                  response.status(500).json({ error: 'Internal Server Error' });
              });
              return;
          }

          // Update Designation table
          database.query(designationQuery, designationValues, function(error, designationResult) {
              if (error) {
                  console.error('Error updating Designation table:', error);
                  // Rollback the transaction
                  database.rollback(function() {
                      response.status(500).json({ error: 'Internal Server Error' });
                  });
                  return;
              }

              // Commit the transaction if both updates were successful
              database.commit(function(err) {
                  if (err) {
                      console.error('Error committing transaction:', err);
                      response.status(500).json({ error: 'Internal Server Error' });
                      return;
                  }

                  // Send success response
                  response.json({ message: 'Data Edited' });
              });
          });
      });
  });
  }
  if (action == 'delete') {
    var id = request.body.id;
  
    // Begin a database transaction
    database.beginTransaction(function (err) {
      var signatoriesQuery = `DELETE FROM Signatories WHERE emp_id = ?`;
      database.query(signatoriesQuery, [id], function (error, result) {
        if (error) {
          console.error('Error deleting signatories:', error);
          // Rollback the transaction
          database.rollback(function () {
            response.status(500).json({ error: 'Internal Server Error' });
          });
          return;
        }
      });
      // Delete the corresponding designation records from the Designation table
      var designationQuery = `DELETE FROM Designation WHERE emp_id = ?`;
      database.query(designationQuery, [id], function (error, result) {
        if (error) {
          console.error('Error deleting designation:', error);
          // Rollback the transaction
          database.rollback(function () {
            response.status(500).json({ error: 'Internal Server Error' });
          });
          return;
        }
  
        // Now delete the employee from the Employee table
        var employeeQuery = `DELETE FROM Employee WHERE id = ?`;
        database.query(employeeQuery, [id], function (error, result) {
          if (error) {
            console.error('Error deleting employee:', error);
            // Rollback the transaction
            database.rollback(function () {
              response.status(500).json({ error: 'Internal Server Error' });
            });
            return;
          }
  
          // Commit the transaction if both delete operations were successful
          database.commit(function (err) {
            if (err) {
              console.error('Error committing transaction:', err);
              response.status(500).json({ error: 'Internal Server Error' });
              return;
            }
  
            // Send success response
            response.json({ message: 'Employee and corresponding designation deleted successfully' });
          });
        });
      });
    });
  }

  // dept
  if (action == 'deptadd') {
    var dept_name = request.body.dept_name;
    var status = request.body.status;

    query = `INSERT INTO Department (dept_name, status) VALUES ("${dept_name}", "${status}")`;

    database.query(query, function (error, data) {
      if (error) {
        console.error('Database Error:', error);
        response.status(500).json({
          error: 'Internal Server Error'
        });
      }
      console.log("Department inserted successfully");

      response.status(200).json({ message: 'Department added successfully' });
  });
  }
  // role
  if (action == 'roleadd') {
    var dept_id = request.body.department;
    var role = request.body.role_name;

    query = `INSERT INTO Role (dept_id, role) VALUES ("${dept_id}", "${role}")`;

    database.query(query, function (error, data) {
      if (error) {
        console.error('Database Error:', error);
        response.status(500).json({
          error: 'Internal Server Error'
        });
      }
      console.log("Role inserted successfully");

      response.status(200).json({ message: 'Role added successfully' });
  });
  }

  // signatories
  if (action == 'fetchsignatories') {
    const query = `
			SELECT 
				e.id as id,
				e.fname AS fname,
				e.lname AS lname,
				e.mname AS mname,
        s.id AS signatory_id,
        s.title AS title,
        s.status as status
			FROM 
				Employee e
			JOIN 
				Signatories s ON s.emp_id = e.id
		`;

    database.query(query, function (error, data) {
      if (error) {
        console.error('Database Error:', error);
        response.status(500).json({
          error: 'Internal Server Error'
        });
      } else {
        // Process the sorted data as needed
        response.json({
          data: data
        });
      }
    });
  }
  if (action == 'signatoriesadd') {
    var emp_id = request.body.semployee;
    var title = request.body.stitle;
    var status = request.body.sstatus;

    query = `INSERT INTO Signatories (emp_id, title, status) VALUES ("${emp_id}", "${title}", "${status}")`;

    database.query(query, function (error, data) {
      if (error) {
        console.error('Database Error:', error);
        response.status(500).json({
          error: 'Internal Server Error'
        });
      }
      console.log("Signatory inserted successfully");

      response.status(200).json({ message: 'Signatory added successfully' });
  });
  }

  // leave
  if (action == 'leave') {
    var emp_id = request.body.emp_id;
    var start_leave = request.body.start_date;
    var end_leave = request.body.end_date;
    var type = request.body.type;
    var status = request.body.status;

    const query = `INSERT INTO Leaves (emp_id, start_leave, end_leave, leave_type, status) VALUES (${emp_id}, '${start_leave}', '${end_leave}', '${type}', '${status}')`;


    database.query(query, function (error, data) {
      if (error) {
        console.error('Database Error:', error);
        response.status(500).json({
          error: 'Internal Server Error'
        });
      }
      console.log("Leave inserted successfully");

      response.status(200).json({ message: 'Leave added successfully' });
  });
  }
  if(action == 'fetchleave_single')
  {
  	var id = request.body.id;

  	var query = `
    SELECT 
      e.id as id,
      l.id AS leave_id,
      l.start_leave AS start_leave,
      l.end_leave AS end_leave,
      l.leave_type AS leave_type,
      l.status AS status
    FROM 
      Employee e
    JOIN 
      Leaves l ON l.emp_id = e.id
    WHERE 
      l.id = "${id}";
    `;
  	database.query(query, function(error, data){
  		response.json(data[0]);
  	});
  }
  if (action == 'leavedelete') {
    var id = request.body.id;

    query = `DELETE FROM Leaves WHERE id = ${id};`;

    database.query(query, [id], function(error, data) {
      if (error) {
          console.error('Database Error:', error);
          return response.status(500).json({ error: 'Internal Server Error' });
      }
      // Send a success response
      response.status(200).json({ message: 'Leave deleted successfully' });
    });
  }
  if (action == 'fetchleave') {
    const query = `
			SELECT 
				e.id as id,
				e.fname AS fname,
				e.lname AS lname,
				e.mname AS mname,
        l.id AS leave_id,
        l.start_leave AS start_leave,
        l.end_leave AS end_leave,
        l.leave_type AS leave_type,
        l.status AS status
			FROM 
				Employee e
			JOIN 
				Leaves l ON l.emp_id = e.id
		`;

    database.query(query, function (error, data) {
      if (error) {
        console.error('Database Error:', error);
        response.status(500).json({
          error: 'Internal Server Error'
        });
      } else {
        // Sort the data by employee ID in ascending order
        data.sort((a, b) => a.Designation_EmployeeID - b.Designation_EmployeeID);

        // Process the sorted data as needed
        response.json({
          data: data
        });
      }
    });
  }
  if(action == 'leaveedit') {
    var id = request.body.id;
  	var start_date = request.body.start_date;
    var end_date = request.body.end_date;
  	var type = request.body.type;
  	var status = request.body.status;

    query = `UPDATE Leaves SET start_leave = '${start_date}', end_leave = '${end_date}', leave_type = '${type}', status = '${status}' WHERE id = ${id}`;
    database.query(query, function(error, data){
  		if (error) {
        console.error('Database Error:', error);
        response.status(500).json({
          error: 'Internal Server Error'
        });
      }
      console.log("Leave updated successfully");

      response.status(200).json({ message: 'Leave updated successfully' });
  	});
  }
  
});

module.exports = router;
