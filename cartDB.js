const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Step 1. schema definition
let orderSchema = new Schema({

	customerName: String,
	order_id: String,
    order_list: [
        { 
            item_id: String,
            item_Name: String,
            quantity: Number,
            price: Number
        }
    ]
}, {
	// Step 2. For collection
	collection: 'cart_gnanasekaran'
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection");
			connection = mongoose.createConnection(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
			model = connection.model("OrderModel", orderSchema);
		};
		return model;
	}
};


orderSchema.methods.getShopperLists = function(){
	return this.order_list.map(
			 (elem) => {
					return {item_id:  elem.item_id,
					name: elem.item_Name, 
					qty: elem.quantity, 
					price: elem.price,
					obj_mid: elem._id}
				});

	//return ({'data': result});
};
