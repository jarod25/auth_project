const sequelize = require('./db');

exports.createDB = async () => {
    await sequelize.sync({ alter: true, force: false });
}
