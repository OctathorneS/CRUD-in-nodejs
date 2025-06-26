//imports 
require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoute');
const taskRoutes = require('./routes/taskRoute');
const errorHandler = require('./middlewares/errorHandler')
//swagger
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
//middlewares
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/task', taskRoutes);
app.use(errorHandler);



const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected via Sequelize.');
    return sequelize.sync({alert:true}); 
  })
  .then(() => {
    console.log('DataBase Sync Successfully')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Sequelize DB connection error:', err));
