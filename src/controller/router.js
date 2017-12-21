const express = require("express");
const aws = require("aws-sdk");
require("env2")("config.env");
const getProfile = require("../database/getProfile");
const getOneProfile = require("../database/getOneProfile");
const router = express.Router();
const addProfile = require("../database/addProfile");
const addProfileNoImage = require("../database/addProfileNoImage");

const checkUser = require("../database/checkUser");
const S3_BUCKET = process.env.S3_BUCKET;

router.get("/", (req, res) => {
  getProfile((err, rows) => {
    if (err) {
      console.log("there is an error" + err);
      res.render("home", { title: "homepage", users: [] });
    } else {
      res.render("home", { title: "homepage", users: rows });
    }
  });
});

router.get("/check_user", (req, res) => {
  const username = req.url.split("=")[1];

  checkUser(username, (err, rows) => {
    if (err) {
      console.log("there is an error " + err);
    } else {
      res.send(JSON.stringify({ available: rows }));
    }
  });
});

router.get("/getProfile/:name", (req, res) => {
  const name = req.params.name;
  getOneProfile(name, (err, rows) => {
    if (err) {
      console.log("there is an error " + err);
    } else {
      res.render("profile", { title: `profile of ${name}`, user: rows });
    }
  });
});

router.post("/save-details", (req, res) => {
  const { username, fullname, description, image_url } = req.body;
  if (image_url) {
    addProfile(username, fullname, description, image_url, (err, result) => {
      if (err) {
        res.send("User couldn't be added");
      }
      res.redirect("/");
    });
  } else {
    addProfileNoImage(username, fullname, description, (err, result) => {
      if (err) {
        res.send("User couldn't be added");
      }
      res.redirect("/");
    });
  }
});

// aws part
router.get("/sign-s3", (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query["file-name"];
  const fileType = req.query["file-type"];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: "public-read"
  };

  s3.getSignedUrl("putObject", s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

router.get("*", (req, res) => {
  console.log(req.url);
  res.send("page not found");
});

module.exports = router;
