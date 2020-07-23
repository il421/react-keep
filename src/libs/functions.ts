import axios from "axios";
import { toast } from "react-toastify";
import { UserData } from "../store/store.types";
import { getMessage, Message } from "../common";

export const getUserByEmail = (
  email: string,
  callback: (data: UserData) => void
): Promise<void> => {
  return axios
    .get("https://us-central1-my-keep-type.cloudfunctions.net/getUserByEmail", {
      params: {
        email,
      },
    })
    .then((response) => {
      if (response.status >= 200 && response.status <= 308) {
        if (
          Object.keys(response.data).length === 0 &&
          response.data.constructor === Object
        ) {
          toast.error(getMessage(Message.userNotFound));
          return;
        }

        callback(response.data as UserData);
      }
    })
    .catch((error) => {
      // handle error
      toast.error(error.message);
      console.log(error.message);
    });
};

export const getUserByUids = (
  uids: string[],
  callback: (data: UserData[]) => void
): Promise<void> => {
  return axios
    .get("https://us-central1-my-keep-type.cloudfunctions.net/getUserByUids", {
      params: {
        uids,
      },
    })
    .then((response) => {
      // handle success
      if (response.status >= 200 && response.status <= 308) {
        if (
          (Object.keys(response.data).length === 0 &&
            response.data.constructor === Object) ||
          (response.data.users && response.data.users.length === 0)
        ) {
          toast.error(getMessage(Message.usersNotFound));
          return;
        }
        callback(response.data.users as UserData[]);
      }
    })
    .catch((error) => {
      // handle error
      toast.error(error.message);
      console.log(error.message);
    });
};
