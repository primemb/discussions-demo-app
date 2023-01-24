import classes from "./Comment.module.scss";
import { IComment } from "../../models/interfaces";
import Avatar from "../Avatar/Avatar";
import moment from "moment";
import LikeButton from "../LikeButton/LikeButton";
import { useAppDispatch } from "../../store/hooks";
import { selectReply } from "../../store/userSlice";

export interface ICommentProps {
  comment: IComment;
  isReply?: boolean;
}

const Comment = ({ comment, isReply = false }: ICommentProps) => {
  const dispatch = useAppDispatch();
  const { text, date, likes, user, id, iLikedIt } = comment;
  const convertedTime = moment(date, "x").fromNow();
  const pattern = /\B@[a-z0-9_-]+/gi;
  const mentions = text.match(pattern);
  let convertText = text;
  if (mentions) {
    for (const mention of mentions) {
      convertText = convertText.replace(
        mention,
        `<span style='color:rgb(36 95 231);background-color:rgb(234 240 253);font-weight:bold'>${mention}</span>`
      );
    }
  }
  return (
    <div className={`${classes.container}`}>
      <Avatar link={user.avatar} alt={user.name} />
      <div className={classes.content}>
        <div className={classes.header}>
          <h3>{user.name}</h3>
          <span>{convertedTime}</span>
        </div>
        <div
          className={classes.description}
          dangerouslySetInnerHTML={{ __html: convertText }}
        />
        <div className={classes.actions}>
          <LikeButton id={id} isLiked={iLikedIt} likes={likes} />
          {!isReply && (
            <button
              onClick={() => dispatch(selectReply(id))}
              className={classes.reply_btn}
            >
              Reply
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
