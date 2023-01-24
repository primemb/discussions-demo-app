import { IDiscussion, IFindDiscussion } from "../models/interfaces";

export const findDiscussionById = (discussions: IDiscussion[], id: number) => {
  const findElement: IFindDiscussion = {
    parentIndex: undefined,
    childIndex: undefined,
  };

  for (let i = 0; i < discussions.length; i++) {
    const discussion = discussions[i];
    if (discussion.id === id) {
      findElement.parentIndex = i;
      break;
    }
    if (discussion.replies.length > 0) {
      for (let j = 0; j < discussion.replies.length; j++) {
        const reply = discussion.replies[j];
        if (reply.id === id) {
          findElement.parentIndex = i;
          findElement.childIndex = j;
          break;
        }
      }
    }
  }

  return findElement;
};
