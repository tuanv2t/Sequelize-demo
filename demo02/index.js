const Sequelize = require('sequelize');
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require ('swagger-ui-express');
const bodyParser = require ('body-parser');

//const path = 'mysql://root:@localhost:3306/sequelize_demo';//
//const sequelize = new Sequelize(path);

const sequelize = new Sequelize('sequelize_demo', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});



sequelize.authenticate().then(() => {
  console.log('Connect to MySQL successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
}).finally(() => {
  //sequelize.close();
});

/*
const User = sequelize.define('user', {
    
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        
    }
}, {
       
    });
*/
const User = require('./models/user')(sequelize);
User.sync({ force: false }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
   console.log('Database is ok');
   
});



const app = express();

const API_PORT = process.env.API_PORT || 3000;



const swaggerDefinition = {
  info: {
    title: 'MySQL Registration Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the user registration routes',
  },
  host: 'localhost:3003',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./api/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./api/register')(app);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));

module.exports = app;

