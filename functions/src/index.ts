import * as admin from "firebase-admin";
const serviceAccount = require(process.env.CREDENTIAL!);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const getUserByEmail = require("./getUserByEmail");
const getUserByUids = require("./getUserByUids");
exports.getUserByEmail = getUserByEmail.getUserByEmail;
exports.getUserByUids = getUserByUids.getUserByUids;
