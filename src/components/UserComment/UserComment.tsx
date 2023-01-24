import moment from "moment";
import { useState } from "react";
import { IDiscussion } from "../../models/interfaces";
import { addComment, addReplay } from "../../store/discussionSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Avatar from "../Avatar/Avatar";
import TextInput from "../TextInput/TextInput";
import classes from "./UserComment.module.scss";

interface IUserCommentProps {
  isReply?: boolean;
  replyId?: number;
}

const UserComment = ({
  isReply = false,
  replyId = undefined,
}: IUserCommentProps) => {
  const [newComment, setNewComment] = useState("");

  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const newDiscussionHandler = (text: string) => {
    const time = +moment().format("x");
    const newDiscussion: IDiscussion = {
      date: time,
      id: time,
      iLikedIt: false,
      likes: 0,
      replies: [],
      text: text,
      user: user,
    };
    if (!isReply) {
      dispatch(addComment(newDiscussion));
    } else {
      dispatch(addReplay({ discussion: newDiscussion, id: replyId as number }));
    }
  };

  const keyPressHandler = (key: React.KeyboardEvent<HTMLInputElement>) => {
    if (key.key === "Enter") {
      newDiscussionHandler(newComment);
      setNewComment("");
    }
  };
  return (
    <div className={classes.container}>
      <Avatar link={user.avatar} alt={user.name} />
      <TextInput
        onChange={(value) => setNewComment(value)}
        onKeyDown={(k) => keyPressHandler(k)}
        placeHolder="Start a discussion"
        type="text"
        value={newComment}
      />
    </div>
  );
};

export default UserComment;
