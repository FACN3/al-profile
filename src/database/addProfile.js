const pool = require('./db_connection');

const addProfile = (username, fullname, description, image_url, cb) => {
  pool.query(
    'INSERT INTO USERS(username, fullname, description, image_url) VALUES ($1, $2, $3, $4);',
    [username, fullname, description, image_url],
    (err, res) => {
      if (err) {
        console.log(err);
        cb('false');
      } else {
        cb(null, 'true');
      }
    }
  );
};

module.exports = addProfile;
