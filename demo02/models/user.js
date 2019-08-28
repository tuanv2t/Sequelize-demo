const Sequelize = require('sequelize');
/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       required:
 *         - firstName
 *         - lastName
 */
module.exports = (sequelize) => {
    
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

    return User;
}

