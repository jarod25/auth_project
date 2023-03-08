const db = require('../config/db');

const User = function(user) {
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
  db.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
      return;
    }

    console.log('created user: ', { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByEmail = (email, result) => {
  db.query('SELECT * FROM users WHERE email = ?', email, (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: 'not_found' }, null);
  });
};

User.findById = (userId, result) => {
  db.query('SELECT * FROM users WHERE id = ?', userId, (err, res) => {
    if (err) {
      console.error('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: 'not_found' }, null);
  });
};

module.exports = User;