export enum Message {
  successLoggedIn,
  successLoggedOut,
  successUpdated,
  errorNoSuchDoc,
  noteSaved,
  noteUpdated,
  noteRemoved,
  noteNotFound,
}

export const getMessage = (message: Message, data?: string | number) => {
  const notifications = {
    [Message.successLoggedIn]: "Logged in successfully",
    [Message.successLoggedOut]: "Logged out successfully",
    [Message.successUpdated]: "Updated successfully",
    [Message.errorNoSuchDoc]: "There is no such a document",
    [Message.noteSaved]: "The note has been saved",
    [Message.noteUpdated]: "The note has been updated",
    [Message.noteRemoved]: "The note has been removed",
    [Message.noteNotFound]: "The note is not found",
  };

  return notifications[message];
};
