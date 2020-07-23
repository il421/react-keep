import * as admin from "firebase-admin";
const serviceAccount = require("../my-keep-type-firebase-adminsdk-ezcu9-f6d8c378a7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://my-keep-type.firebaseio.com",
});

const getUserByEmail = require("./getUserByEmail");
const getUserByUids = require("./getUserByUids");
exports.getUserByEmail = getUserByEmail.getUserByEmail;
exports.getUserByUids = getUserByUids.getUserByUids;
