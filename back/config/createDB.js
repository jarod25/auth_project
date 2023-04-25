const sequelize = require('./db');

sequelize.sync({ alter: true, force: true })
    .then(() => {
        console.log('Tables created');
    });