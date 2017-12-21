const pool = require('./db_connection');

const getProfile = cb => {
  pool.query('SELECT * FROM USERS;', (err, res) => {
    if (err) {
      cb('Error' + err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getProfile;
