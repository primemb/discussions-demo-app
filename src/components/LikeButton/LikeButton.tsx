import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { like } from "../../store/discussionSlice";
import { useAppDispatch } from "../../store/hooks";

import classes from "./LikeButton.module.scss";

interface ILikeButtonProps {
  likes: number;
  id: number;
  isLiked: boolean;
}

const LikeButton = ({ id, isLiked, likes }: ILikeButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <button
      className={classes.container}
      onClick={() => dispatch(like(id))}
      style={{
        backgroundColor: isLiked ? "#235ee7" : "#f4f5fa",
        color: isLiked ? "white" : "#909ab4",
      }}
    >
      {isLiked ? <AiFillLike /> : <AiOutlineLike />} {likes}
    </button>
  );
};

export default LikeButton;
