var express = require('express');
var cookieParser = require('cookie-parser');
const session = require('express-session');

var router = express.Router();

//Importing Databases
const inventoryDB = require('../inventoryDB.js');
const Inventory = inventoryDB.getModel();
// customer database
const customerDB = require('../customerDB.js');
const Member = customerDB.getModel();
//cart database
const cartDB = require('../cartDB');
const MemCart = cartDB.getModel();

var Cart 			= require("../displayOrderedItems");

// router specs
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('homeView');
});

//member routes
router.get('/member', async (req, res, next) => {

  let items = await Inventory.find({});
  let results = items.map( invent => {
      return {

              id: invent.item_id,
              name: invent.item_Name,
              description: invent.description,
              quantity: invent.quantity,
              price: invent.price,
              obj_id: invent._id
             }
    });
    
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    req.session.cart = cart;
    
    res.render('ViewItems', {data: results,totalQty: cart.totalQty});
});

//session starts
router.get('/member/addcart/:id', async (req, res, next) => {
 
	let ids = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

  Inventory.findById(ids, (err, product) => {
    if(err){
      return res.render('404');
    }  
    
    if (!product) {
      return res.render('404');
    } else {
 
		cart.add(product, product.id);
		req.session.cart = cart;

    res.redirect('/member');
    }
  });
});

router.get('/member/cart', async (req, res, next) =>{
  if(!req.session.cart){
    return res.render('OrderedList',{product: null});
  }
  var cart = new Cart(req.session.cart);

  res.render('OrderedList',{product: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty});
});
  
router.get('/member/cart/signin', async (req, res, next) =>{
  let member = await Member.find({});

  let result = member.map(mem => {
       return {
         name: mem.customerName,
         id: mem.id
        }
  });
  var cart = new Cart(req.session.cart);

  res.render('CheckIn',{record: {id : result.id}, bal: cart});
});

router.post('/member/cart/signin', async (req, res, next)=> {

  let id = req.body.c_id;
  
  let member = await Member.find({'id': id});

  let result = member.map(mem => {
       return {
         name: mem.customerName,
         id: mem.id
        }
  });
  
  if (!member) {
      res.render('404');
    } else {
      if(!req.session.cart){
        return res.render('OrderedList',{product: null});
      }
      
      var cart = new Cart(req.session.cart);
      res.render('DisplayList',{product: cart.generateArray(), totalPrice: cart.totalPrice,data: result });
    }
});

//session destroyed
router.post('/member/cart/order', async (req, res, next)=> {

  if(!req.session.cart){
    return res.render('OrderedList',{product: null});
  }
  
  var cart = new Cart(req.session.cart);

  let order_list = cart.generateArray();
  if (order_list.length > 0) {

    order_list = order_list.map((order) => {
      
        return {item_id:order.item.item_id,
                item_Name:order.item.item_Name,
                quantity: order.qty,
                price: order.price};
      });
  } else
    order_list = [];

  let items = new MemCart({
     
    customerName: req.body.name,
    order_id: req.body.id,
    order_list: order_list
    }); 
    
    await items.save();

    let data = cart.generateArray();
    result = data.map((bal)=> {return {balance: bal.balance, _id: bal._id}});
    for(i=0;i<data.length;i++){
       await Inventory.updateOne({'_id': data[i].item._id},
              {$set:{'quantity': result[i].balance}});
    }
    req.session.destroy(); 
    res.redirect('/member');
});

//admin routes
router.get('/admin', async (req, res, next) => {
  
  let inventory = await Inventory.find({});

  let results = inventory.map( invent => {
      return {
        id: invent.item_id,
        name: invent.item_Name,
        description: invent.description,
        quantity: invent.quantity,
        price: invent.price,
        _id: invent._id
        }
      });
            
  let member = await Member.find({});

  let result = member.map(mem => {
    return {
      name: mem.customerName,
      id: mem.id
      }
    });

  res.render('ViewAdmin', {record: result, data: results});
});

router.get('/admin/add', async (req, res, next) =>{
  res.render('addAdmin');
});

router.post('/admin/add', async (req, res, next)=> {

  let invent = new Inventory({

    item_id: req.body.p_id,
    item_Name: req.body.p_name,
    description: req.body.desc,
    quantity: req.body.qty,
    price: req.body.price
  }); 

  await invent.save();
  res.redirect('/admin');
});

router.get('/admin/edit/:id', async (req, res, next) =>{

  let id = req.params.id;

  let invent = await Inventory.find({'_id': id});
  
  if (!invent){
    res.render('/admin');
    }
    else {
    res.render('editAdmin',{data: {_id: id,id:invent.item_id, name: invent.item_Name, desc: invent.description, qty: invent.quantity,price: invent.price}});                
    }
});

router.post('/admin/edit/', async (req, res, next) =>{
  
  let id = req.body._id;
 
  let docs = await Inventory.updateOne({'_id': id},
              {$set:{
                'item_id':req.body.id,
              'item_Name': req.body.name,
              'description': req.body.desc,
              'quantity': req.body.qty,
              'price': req.body.price
              }} );
  res.redirect('/admin');
});

router.get('/admin/delete/:id', async (req, res, next) =>{

  let id = req.params.id;
  
  let invent = await Inventory.find({'_id': id});

  if (!invent) {
    res.render('404');
  } else {
      res.render('deleteAdmin', {data: id});
  }
});

router.post('/admin/delete', async (req, res, next) =>{
  
  let id = req.body._id;
  let invent = await Inventory.findById(id);

	  if (!invent) {
	   	res.render('404');
	  } else {
	    await invent.remove();
      
      res.redirect('/admin');
    }
});

//Admin side Member Cart
router.get('/admin/memcart/:id',async (req, res, next) =>{

  let id = req.params.id;

  let memcart = await MemCart.find({'order_id': id});

  let result = memcart.map((memc) => {
    return {
      obj_id: memc._id,
      c_name: memc.customerName,
      c_id: memc.order_id,
      c_list: memc.getShopperLists()
      }
    });
      
  res.render('ViewCart', {_data: result});
});

router.get('/admin/memcart/add/:id',async (req, res, next) =>{
 
  let _id = req.params.id;
  res.render('MemCart',{ obj_id: _id});
});

router.post('/admin/memcart/add',async (req, res, next) =>{

  let id = req.body.obj_id;
  let c_id = req.body.c_id;
  
  let docs = await MemCart.updateOne({'_id':id},{$push:{'order_list':[{     
    'item_id':req.body.id,
    'item_Name':req.body.name,
    'quantity': req.body.qty,
    'price': req.body.price}]
  }});

  let memcart = await MemCart.find({'order_id': c_id});
  
  let result = memcart.map((memc) => {
    return {
      obj_id: memc._id,
      c_name: memc.customerName,
      c_id: memc.order_id,
      c_list: memc.getShopperLists()
      }
    });
  res.render('ViewCart',{_data: result});
});

router.get('/admin/memcart/delete/:id', async (req, res, next) =>{

  let id = req.params.id;
  
  let memcart = await MemCart.find({'_id': id});

  if (!memcart) {
      res.render('404');
    } else {
      res.render('deleteCart', {obj_mid: id});
    }
});

router.post('/admin/memcart/delete', async (req, res, next) =>{
  
  let id = req.body.obj_mid;
  let c_id = req.body.c_id;
  
  let docs = await MemCart.updateOne({'_id':id},{$pull:{'order_list':{'item_id':req.body.id}}});
 
  let memcart = await MemCart.find({'order_id': c_id});

  let result = memcart.map((memc) => {
      return {
          obj_id: memc._id,
          c_name: memc.customerName,
          c_id: memc.order_id,
          c_list: memc.getShopperLists()
          }
        });
  res.render('ViewCart',{_data: result});
});

router.get('/admin/memcart/edit/:id', async (req, res, next) =>{

  let id = req.params.id;
  
  let memcart = await MemCart.find({'_id': id});

  if (!memcart) {
      res.render('404');
    } else {
      res.render('editMemCart', {_id: id});
    }
});

router.post('/admin/memcart/edit/', async (req, res, next) =>{
  
  let id = req.body._id;

  await MemCart.updateOne({'_id':id},{$set:{'order_list.0':{'item_id':req.body.id,
              'item_Name': req.body.name,
              'quantity': req.body.qty,
              'price': req.body.price}}});

  let c_id = req.body.c_id;
  let memcart = await MemCart.find({'order_id': c_id});

  let result = memcart.map((memc) => {
      return {
          obj_id: memc._id,
          c_name: memc.customerName,
          c_id: memc.order_id,
          c_list: memc.getShopperLists()
          }
        });
  res.render('ViewCart',{_data: result});
});

//Restful api Json and XML for list of products
router.get('/rest',  async (req, res, next) => {
  res.format({

		'application/json': async (req, res, next) => {
      let items = await Inventory.find({});
     let results = items.map( invent => {
      return {

              id: invent.item_id,
              name: invent.item_Name,
              description: invent.description,
              quantity: invent.quantity,
              price: invent.price,
              obj_id: invent._id
             }
    });
   
    res.json(results);
		},

    'application/xml': async (req, res, next) => {
			let items = await Inventory.find({});

			//let result =[];
      let results = items.map( invent => {
        return {
  
                id: invent.item_id,
                name: invent.item_Name,
                description: invent.description,
                quantity: invent.quantity,
                price: invent.price,
                obj_id: invent._id
               }
        });
			// result.push(product.lookupByID(id));
			let allXml = 
				'<?xml version="1.0"?>\n<Products>\n' +
					results.map((c) => {
						return '	<Product>\n' +
            '	  <id>' + c.id + '</id>\n' +
            '	  <name>' + c.name + '</name>\n' +
							'	  <description>' + c.description + '</description>\n' +
              '	  <quantity>' + c.quantity + '</quantity>\n' +
							' 	<price>$' + c.price + '</price>\n' +
              '	</Product>\n' ;
					}).join('\n')+ '</Products>\n';
			
			res.type('application/xml');
			res.send(allXml);
		},

    'default': async (req, res, next) => {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});
});

//displays products between price range
router.get('/price/:from/range/:to', async (req, res, next) => {
  res.format({

		'application/json': async (req, res, next) => {
			let from = req.params.from;
      let to = req.params.to;
      Inventory.find({price: {$gte: from, $lte: to}}, (err, products) => {
        if(err){
          return res.redirect('/');
        }  
        
        if (!products) {
          return res.redirect('/');
        } else {
          res.json(products);
        }
      });
		},

		'application/xml': async (req, res, next) => {
			let from = req.params.from;
      let to = req.params.to;
      Inventory.find({price: {$gte: from, $lte: to}}, (err, products) => {
        if(err){
          return res.redirect('/');
        }  
        
        if (!products) {
          return res.redirect('/');
        } else {
      let priceXml = 
				'<?xml version="1.0"?>\n<Products>\n' +
					products.map((c) => {
						return '	<Product>\n' +
            '	  <id>' + c.item_id + '</id>\n' +
            '	   <name>' + c.item_Name + '</name>\n' +
							'	   <description>' + c.description + '</description>\n' +
              '	  <quantity>' + c.quantity + '</quantity>\n' +
							'	  <price>$' + c.price + '</price>\n' +
              '	</Product>\n';
					}).join('\n')+ '</Products>\n';
        
			res.type('application/xml');
			res.send(priceXml);
    }
  });
		},

		'default': async (req, res, next) => {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});
});

//search by name of the product
router.get('/rest/:name', (req, res) => {
  res.format({

		'application/json': async (req, res, next) => {
			let name = req.params.name;
      
      Inventory.find({'item_Name':name}, (err, products) => {
        if(err){
          return res.redirect('/');
        }  
        
        if (!products) {
          return res.redirect('/');
        } else {
          res.json(products);
        }
      });
		},

		'application/xml': async (req, res, next) => {
			let name = req.params.name;
			let result =[];
			//result.push(product.lookupByID(id));
      Inventory.find({'item_Name':name}, (err, products) => {
        if(err){
          return res.redirect('/');
        }  
        
        if (!products) {
          return res.redirect('/');
        } else {
      
			let nameXml = 
				'<?xml version="1.0"?>\n<Product name="' + name + '">\n' +
					products.map((c) => {
						return '	<id>' + c.item_id + '</id>\n' +
							'	<description>' + c.description + '</description>\n' +
              '	<quantity>' + c.quantity + '</quantity>\n' +
							'	<price>$' + c.price + '</price>\n';
					}).join('\n')+ '</Product>\n';
        
			res.type('application/xml');
			res.send(nameXml);
    }
    });
		},

		'default': () => {
			res.status(404);
			res.send("<b>404 - Not Found</b>");
		}
	});
});

module.exports = router;



