import classes from "./Discussion.module.scss";
import { IComment } from "../../models/interfaces";
import Comment from "../Comment/Comment";
import { useAppSelector } from "../../store/hooks";
import UserComment from "../UserComment/UserComment";

interface IDiscussionProps {
  comment: IComment;
  replies: IComment[];
}

const Discussion = ({ comment, replies }: IDiscussionProps) => {
  const selectForReply = useAppSelector((state) => state.user.selectForReply);
  return (
    <li className={`${classes.container} ${classes.list_item}`}>
      <Comment comment={comment} />
      <div className={classes.replies}>
        <div className={classes.line}></div>
        <ul>
          {replies.map((reply) => (
            <li className={classes.list_item} key={reply.id}>
              <Comment comment={reply} isReply />
            </li>
          ))}
        </ul>
        {selectForReply === comment.id && (
          <UserComment isReply replyId={comment.id} />
        )}
      </div>
    </li>
  );
};

export default Discussion;
