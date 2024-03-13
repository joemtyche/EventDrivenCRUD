var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	response.render('employee', {title : 'Employee Management System'});

});

router.post("/action", function(request, response, next){

	var action = request.body.action;

	if(action == 'fetch')
	{
		var query = "SELECT * FROM Employee ORDER BY id DESC";

		database.query(query, function(error, data){

			response.json({
				data:data
			});

		});
	}

	if(action == 'Add')
	{
		var first_name = request.body.first_name;
        var middle_name = request.body.middle_name;
		var last_name = request.body.last_name;
		var address = request.body.address;

		var barangay = request.body.barangay;
        var province = request.body.province;
		var country = request.body.country;
		var zipcode = request.body.zipcode;
		var department = request.body.department;
        var etype = request.body.etype;
		var status = request.body.status;

		console.log('First Name:', first_name);
		console.log('Middle Name:', middle_name);
		console.log('Last Name:', last_name);
		console.log('Address:', address);
		console.log('Barangay:', barangay);
		console.log('Province:', province);
		console.log('Country:', country);
		console.log('Zipcode:', zipcode);
		console.log('department:', department);
		console.log('etype:', etype);
		console.log('status:', status);

		var query = `
		INSERT INTO Employee 
		(fname, mname, lname, address, barangay, province, country, zipcode, department, etype, status) 
		VALUES ("${first_name}", "${middle_name}", "${last_name}", "${address}", 
		"${barangay}", "${province}", "${country}", "${zipcode}", "${department}", "${etype}", "${status}")
		`;

		database.query(query, function(error, data){
			if (error) {
				console.error('Database Error:', error);
				response.status(500).json({
					error: 'Internal Server Error'
				});
			} else {
				response.json({
					message : 'Data Added'
				});
			}
		});
	}

	if(action == 'fetch_single')
	{
		var id = request.body.id;

		var query = `SELECT * FROM Employee WHERE id = "${id}"`;

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

		var department = request.body.department;
		var etype = request.body.etype;
		var status = request.body.status;

		var query = `
			UPDATE Employee 
			SET fname = "${first_name}", 
			mname = "${middle_name}", 
			lname = "${last_name}", 
			address = "${address}",
			barangay = "${barangay}",
			province = "${province}",
			country = "${country}",
			zipcode = "${zipcode}",
			department = "${department}",
			etype = "${etype}",
			status = "${status}" 
			WHERE id = "${id}"
		`;

		database.query(query, function(error, data){
			response.json({
				message : 'Data Edited'
			});
		});
	}

	if(action == 'delete')
	{
		var id = request.body.id;

		var query = `DELETE FROM Employee WHERE id = "${id}"`;

		database.query(query, function(error, data){

			response.json({
				message : 'Data Deleted'
			});

		});
	}

});

module.exports = router;
