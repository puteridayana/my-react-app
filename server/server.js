const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { dbconnection } = require('./connections/database');
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const manageRoutes = require('./routes/manage');
const usersRoutes = require('./routes/users');
const authMiddleware = require('./middlewares/auth');  

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

// Public routes
app.use('/auth', authRoutes);  
app.use('/search', searchRoutes);  



// //Protected routes
app.use('/manage', authMiddleware.verifyToken, manageRoutes);  
app.use('/users', authMiddleware.verifyToken, usersRoutes);   

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening on port ${process.env.SERVER_PORT}`);
});
