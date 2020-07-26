const express = require('express');
const pathCategory = require('./router/category');
const pathProduct = require('./router/product');
const pathCustomer = require('./router/customer');
const pathUser = require('./router/user');
const pathOrder = require('./router/order');
const pathLoginCustomer = require('./router/logincustomer');
const pathLoginUser = require('./router/loginuser');


const mongoose = require('mongoose');
  

const app = express();
app.use(express.json());
app.use('/api/category', pathCategory);
app.use('/api/product',pathProduct);
app.use('/api/customer',pathCustomer); 
app.use('/api/user',pathUser);
app.use('/api/order',pathOrder);

app.use('/api/logincustomer',pathLoginCustomer);
app.use('/api/loginuser',pathLoginUser);

mongoose.connect('mongodb://localhost/food')
    .then(()=>console.log('connected'))
    .catch(()=>console.log('not'))

const port = process.env.PORT || 3002;

app.listen(port,()=>{ console.log('lostening to 3001')})