import * as admin from "firebase-admin";
import UserRecord = admin.auth.UserRecord;

export interface UserData extends Pick<UserRecord, "uid"> {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
