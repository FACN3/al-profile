const pool = require("./db_connection");

const addProfileNoImage = (username, fullname, description, cb) => {
  pool.query(
    "INSERT INTO USERS(username, fullname, description) VALUES ($1, $2, $3);",
    [username, fullname, description],
    (err, res) => {
      if (err) {
        console.log(err);
        cb("false");
      } else {
        cb(null, "true");
      }
    }
  );
};

module.exports = addProfileNoImage;
