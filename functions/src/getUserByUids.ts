import { https, Request, Response } from "firebase-functions";
import * as admin from "firebase-admin";
import { UserData } from "./functions.types";
import GetUsersResult = admin.auth.GetUsersResult;

exports.getUserByUids = https.onRequest(
  (request: Request, response: Response) => {
    response.set("Access-Control-Allow-Origin", "*");
    const uids: any[] = request.query.uids as any;

    if (uids && uids.length > 0) {
      const mappedUids = Array.from(uids, (uid) => ({ uid }));
      admin
        .auth()
        .getUsers(mappedUids)
        .then((data: GetUsersResult) => {
          // the users not found
          if (
            (Object.keys(data).length === 0 && data.constructor === Object) ||
            data.users.length === 0
          ) {
            return response.send(new Error("Users are not found in the app"));
          } else {
            return response.send({
              users: Array.from(
                data.users,
                (u) =>
                  ({
                    uid: u.uid,
                    email: u.email ?? null,
                    photoURL: u.photoURL ?? null,
                    displayName: u.displayName ?? null,
                  } as UserData)
              ),
            });
          }
        })
        .catch((e) => response.send(new Error(e)));
    } else {
      response.send(new Error("Uids is not specified"));
    }
  }
);
