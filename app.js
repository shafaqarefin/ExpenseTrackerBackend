//Importing Necessary Libraries
require('dotenv').config({ quiet: true });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/database');
const { restrictToLoggedInUser } = require('./middlewares/authentication');

//connecting to mongoDB
connectDB()

// Importing Routes
const authRoutes = require('./routes/authRoute');
// const userRoutes = require('./routes/userRoutes');

//Declaring necessary variables
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());        // Parse JSON requests
app.use(cookieParser());        // Parse cookies
app.use(cors({                  // Optional: allow my frontend to call API
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.get('/test',restrictToLoggedInUser,(req,res)=>{
  res.status(200).send('bal')
})


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
