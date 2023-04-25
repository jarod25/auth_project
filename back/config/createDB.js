const sequelize = require('./db');

sequelize.sync({ alter: true, force: false })
    .then(() => {
        console.log('Tables created');
    });