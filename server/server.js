const express = require('express'); 
const dotenv = require('dotenv');  
const cookieParser = require('cookie-parser');  
const connectDB = require('./config/db'); 
dotenv.config(); 
connectDB(); 
const app = express(); 
app.use(cookieParser());    
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 