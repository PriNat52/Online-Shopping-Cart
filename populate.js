const customerDB = require('./customerDB.js');
const inventoryDB = require('./inventoryDB.js');

const Member = customerDB.getModel();
const Item = inventoryDB.getModel();

const cartDB = require('./cartDB.js');
const MemCart = cartDB.getModel();

/*
(async() => {

	await Member.deleteMany({});

	let member1 = new Member({
		customerName:'Jalal', id:'cs602a'
	}); 

	let member2 = new Member({
		customerName:'Jane', id:'cs602b'
	}); 

	let member3 = new Member({
		customerName:'Jack', id:'cs602c'
	}); 


	await Promise.all([
            member1.save(), 
			member2.save(), 
			member3.save()
		]);

	let currentMembers = await Member.find({});

	console.log(currentMembers);

	process.exit();


})();
*/

(async() => {

	await Item.deleteMany({});

	let item1 = new Item({
		item_id: '1a',
		item_Name: 'Bread',
		description: 'Premium quality',
		quantity: 20,
		price: 3.44
	}); 

	let item2 = new Item({
		item_id: '2a',
		item_Name: 'Milk',
		description: 'Organic',
		quantity: 15,
		price: 6.99
	}); 

	let item3 = new Item({
		item_id: '3a',
		item_Name: 'Egg',
		description: 'Premium Large Brown Eggs',
		quantity: 20,
		price: 7.87
	}); 

	let item4 = new Item({
		item_id: '4a',
		item_Name: 'Sparkling Water',
		description: 'Premium Sparkles',
		quantity: 25,
		price: 9.89
	}); 

	let item5 = new Item({
		item_id: '5a',
		item_Name: 'Pen',
		description: 'Multi Colored, Smooth tip',
		quantity: 20,
		price: 6.00
	}); 


	await Promise.all([
            item1.save(), 
			item2.save(), 
			item3.save(),
			item4.save(),
			item5.save()
		]);

	let currentItems = await Item.find({});

	console.log(currentItems);

	process.exit();


})();

/*
(async() => {

	await MemCart.deleteMany({});

	let member1 = new MemCart({
		customerName:'Jalal', order_id:'cs602a', order_list: [
			{ 
				item_id: '1a',
				item_Name: 'Bread',
				description: 'Premium quality',
				quantity: 20,
				price: 3.44
			},
			{
				item_id: '5a',
				item_Name: 'Pen',
				description: 'Multi Colored, Smooth tip',
				quantity: 20,
				price: 6.00
			},
			{
				item_id: '4a',
				item_Name: 'Sparkling Water',
				description: 'Premium Sparkles',
				quantity: 25,
				price: 9.89
			}
		]
	}); 

	let member2 = new MemCart({
		customerName:'Jane', order_id:'cs602b', order_list: [
			{item_id: '1a',
			item_Name: 'Bread',
			description: 'Premium quality',
			quantity: 20,
			price: 3.44},
			{
				item_id: '3a',
				item_Name: 'Egg',
				description: 'Premium Large Brown Eggs',
				quantity: 20,
				price: 7.87
			},{
				item_id: '5a',
				item_Name: 'Pen',
				description: 'Multi Colored, Smooth tip',
				quantity: 20,
				price: 6.00
			},
			{
				item_id: '4a',
				item_Name: 'Sparkling Water',
				description: 'Premium Sparkles',
				quantity: 25,
				price: 9.89
			}
		]
	}); 

	await Promise.all([
            member1.save(), 
			member2.save()
		]);

	let currentCart = await MemCart.find({});

	console.log(currentCart);

	process.exit();


})();*/
