const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error: ' + err));


app.use('/auth', authRoutes);
app.use('/profile', authMiddleware, profileRoutes);


app.use(errorMiddleware);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`le server écoute sur le port ${port}`));




