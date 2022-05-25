import axios from "axios";
import { toast } from "react-toastify";

import { getMessage, Message } from "../common";
import { UserData } from "../store/store.types";

export const getUserByEmail = (
  email: string,
  callback: (data: UserData) => void
): Promise<void> => {
  return axios
    .get(`${process.env.REACT_APP_FUNCTION_URL}/getUserByEmail`, {
      params: {
        email
      }
    })
    .then(response => {
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
    .catch(error => {
      // handle error
      toast.error(error.message);
      // eslint-disable-next-line no-console
      console.warn(error.message);
    });
};

export const getUserByUids = (
  uids: string[],
  callback: (data: UserData[]) => void
): Promise<void> => {
  return axios
    .get(`${process.env.REACT_APP_FUNCTION_URL}/getUserByUids`, {
      params: {
        uids
      }
    })
    .then(response => {
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
    .catch(error => {
      // handle error
      toast.error(error.message);
      // eslint-disable-next-line no-console
      console.warn(error.message);
    });
};
