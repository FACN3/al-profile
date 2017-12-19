BEGIN;

CREATE TABLE IF NOT EXISTS USERS(
  id serial PRIMARY KEY,
  username varchar(20) NOT NULL,
  fullname varchar(100) NOT NULL,
  description text NOT NULL,
  image_url TEXT
);

commit;
