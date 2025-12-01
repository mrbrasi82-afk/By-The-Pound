require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// basic security
app.use(helmet());

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').filter(Boolean);
app.use(cors({
  origin: function(origin, cb){
    if(!origin) return cb(null, true);
    if(allowedOrigins.length===0) return cb(null, true);
    if(allowedOrigins.indexOf(origin) !== -1) return cb(null, true);
    return cb(new Error('CORS not allowed'), false);
  }
}));

app.use(express.json({limit: '10mb'}));

// rate limiter
const limiter = rateLimit({ windowMs: 15*60*1000, max: 200 });
app.use(limiter);

connectDB();

// static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/artworks', require('./routes/artworks'));
app.use('/api/users', require('./routes/users'));
app.use('/api/checkout', require('./routes/checkout'));

// error handler
const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
