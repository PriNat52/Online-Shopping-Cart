const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Step 1. the schema definition
let customerSchema = new Schema({
	customerName: String,
	id: String
}, {
	// Step 2. For collection
	collection: 'finalproject_gnanasekaran'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("CustomerModel", customerSchema);
		};
		return model;
	}
};