const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const connectDB = require('./Models/db'); // Import your connectDB function
require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter); 
app.get('/', (req, res) => {
    res.send("welcome ");
});

// Connect to MongoDB
connectDB(); // Call the function to establish the connection

// Ensure you are using AuthRouter, not authRouter

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
