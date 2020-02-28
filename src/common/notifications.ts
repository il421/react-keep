export enum Message {
  successLoggedIn,
  successLoggedOut,
  successUpdated,
  errorNoSuchDoc
}

export const getMessage = (
  message: Message,
  data?: string | number
) => {
  const notifications = {
    [Message.successLoggedIn]: "Logged in successfully",
    [Message.successLoggedOut]: "Logged out successfully",
    [Message.successUpdated]: "Updated successfully",
    [Message.errorNoSuchDoc]: "There is no such a document"
  };

  return notifications[message];
};
