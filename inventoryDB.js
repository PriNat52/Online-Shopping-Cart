const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Step 1. the schema definition
let inventorySchema = new Schema({
	
	item_id: String,
    item_Name: String,
    description: String,
    quantity: Number,
    price: Number

}, {
	// Step 2. For collection
	collection: 'inventory_gnanasekaran'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("InventoryModel", inventorySchema);
		};
		return model;
	}
};