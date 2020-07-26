const express = require('express');
const mongoose  = require('mongoose');
const {Order,validate} = require('../model/order');
const {Product} = require('../model/product');
const {Customer} = require('../model/customer');
const Joi = require('joi');
mongoose.set('useFindAndModify', false);

const router = express.Router();

router.get('/',async(req,res)=>{
	let result = await Order
	    .find()
	    .populate('products','name price -_id')
	    .populate('customer','name mobile email -_id')

	
	res.send(result);

	
})
router.get('/:id',async(req,res)=>{
		let findOrder = await Order.findById(req.params.id).populate('products','name price -_id').populate('customer','name mobile email -_id');
	if(!findOrder){
		res.status(404).send('invalid Order Id');
		return;
	}
    res.send(findOrder);

})


router.post('/',async(req,res)=>{
	let total = 0;
	let findproduct = [];
	let quantity = [];

	let valid = validate(req.body);
	if(valid.error){
		res.status(400).send(valid.error.details[0].message);
		return;
	}
	let p = req.body.products;
	let q = req.body.quantity;
	
	for(let i=0;i<p.length;i++){
		let find = await Product.findById(p[i]);
		findproduct.push(find);
		let quan = q[i];
		quantity.push(quan);

		total +=find.price*quan;

		if(!find){
			res.status(404).send('inavalid');
			return;
		}
	
	}
	let checkCustomer = await Customer.findById(req.body.customer)
	if(!checkCustomer){
		res.status(404).send('invalid Customer Id');
		return;
	}

	const order = new Order({
		products:findproduct,
		quantity:quantity,
		customer:checkCustomer,
		total:total
	})
    let result = await order.save();
    res.send(result);

	//let p = await Promise.all(list.map(_id => Product.findById(_id)));

})

router.delete('/:id',async(req,res)=>{
	
		let order = await Order
	    .findOneAndRemove(req.params.id)
	    
		if(!order){
			res.status(404).send('not found');
			return;
		}
		res.send(order);
	
});

module.exports = router;

