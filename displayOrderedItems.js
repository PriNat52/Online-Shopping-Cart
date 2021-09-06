const inventoryDB = require('./inventoryDB.js');
const Inventory = inventoryDB.getModel();

const customerDB = require('./customerDB.js');
const Member = customerDB.getModel();

const cartDB = require('./cartDB');
const MemCart = cartDB.getModel();

module.exports = function Cart(olditems) {
    this.items = olditems.items || {};
    this.totalQty = olditems.totalQty || 0;
    this.totalPrice = olditems.totalPrice || 0;
    //this.balance = 

    this.add = function(item,id){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0, balance: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        storedItem.balance = storedItem.item.quantity - storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };
    
    this.delete = function(item,id){
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = {item: item, qty: 0, price: 0};
        }
        storedItem.qty--;
        storedItem.price = storedItem.item.price - storedItem.qty;
        this.totalQty--;
        this.totalPrice -= storedItem.item.price;
    };

    this.generateArray = function() {
        var arr=[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};

//module.exports = function name(params) {
    
//};