const mongoose = require('mongoose');
const Joi = require('joi');
const {Product}  = require('./product');
const {Customer}  = require('./customer');
Joi.objectId = require('joi-objectid')(Joi);

const orderSchema = new mongoose.Schema({
	products :[{
		type:mongoose.Schema.Types.ObjectId,
		ref: 'product'
	}],
	quantity:{
		type:[Number],
		default:1
	},
	customer:{
		type:mongoose.Schema.Types.ObjectId,
		ref: 'customer'		
	},
	total:{
		type:Number
	}

})

const Order = mongoose.model('order',orderSchema);

function validationOrder(value){
	const schema = Joi.object({
        products: Joi.array().items(Joi.objectId()).required(),
        quantity: Joi.array().items(Joi.number()).required(),
        customer: Joi.objectId().required()         

    })
	const result = schema.validate(value);
	return result;	
}

exports.Order = Order;
exports.validate = validationOrder;
