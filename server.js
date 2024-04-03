const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('./db');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const tweetRoutes = require('./routes/tweets');
const timelineRoutes =require('./routes/timeline.js')

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tweets', tweetRoutes);
app.use('/timeline', timelineRoutes);

app.listen (port,()=>{
    console.log(`listening to ${port}`)
})