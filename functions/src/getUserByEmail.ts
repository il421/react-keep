import { https, Request, Response } from "firebase-functions";
import * as admin from "firebase-admin";
import { UserData } from "./functions.types";
import UserRecord = admin.auth.UserRecord;

exports.getUserByEmail = https.onRequest(
  (request: Request, response: Response) => {
    response.set("Access-Control-Allow-Origin", "*");
    const email: string = request.query.email as string;
    if (!!email) {
      admin
        .auth()
        .getUserByEmail(email)
        .then((data: UserRecord) => {
          // the user id not found
          if (Object.keys(data).length === 0 && data.constructor === Object) {
            return response.send(new Error("The user is not found in the app"));
          } else {
            const { uid, email, displayName, photoURL } = data;
            return response.send({
              uid,
              email: email ?? null,
              photoURL: photoURL ?? null,
              displayName: displayName ?? null,
            } as UserData);
          }
        })
        .catch((e) => response.send(new Error(e)));
    } else {
      response.send(new Error("Email is not specified"));
    }
  }
);
