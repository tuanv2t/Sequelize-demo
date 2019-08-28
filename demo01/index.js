const Sequelize = require('sequelize');

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


const User = sequelize.define('user', {
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
        // options
    });

User.sync({ force: false }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    return User.create({
        firstName: 'John',
        lastName: 'Hancock'
    });
});

// Find all users
User.findAll().then(users => {
    console.log("All users:", JSON.stringify(users, null, 4));
});

// Create a new user
User.create({ firstName: "Jane", lastName: "Doe" }).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
});

// Delete everyone named "Jane"
User.destroy({
    where: {
        firstName: "Jane"
    }
}).then(() => {
    console.log("Done");
});

// Change everyone without a last name to "Doe"
User.update({ lastName: "Doe" }, {
    where: {
        lastName: null
    }
}).then(() => {
    console.log("Done");
});

