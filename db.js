const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/twitter';

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const db = mongoose.connection;
db.on('error',()=>console.log('Mongo connection error'));
db.on('open',()=>{
    console.log('Mongodb connected');
});

module.exports = db;