const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const {port, db_url} = require('./config/db.js');

//routes
const weightRoutes = require('./routes/weight.js');
mongoose.connect(db_url)
.then(()=>{console.log("Connected to DB")})
.catch(()=>{console.log("Something went wrong")});

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/weight_tracking_app', weightRoutes);

app.listen(port, (req,res)=>{
    console.log(`Listening at port ${port}`)
});
