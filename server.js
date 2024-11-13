const express=require('express')
const bodyParser=require('body-parser');
const connectDB=require('./config/db');
const feedbackRoutes=require('./routes/feedback');
require('dotenv').config();
const app=express();
connectDB();
app.use(bodyParser.json());
//Routes
app.use('/api/feedback',feedbackRoutes);

const PORT=process.env.PORT || 5000;
//start sever
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));


