import { IDiscussion } from "../../models/interfaces";
import Discussion from "../Discussion/Discussion";
import classes from "./Discussions.module.scss";

interface IDiscussionProps {
  discussions: IDiscussion[];
}

const Discussions = ({ discussions }: IDiscussionProps) => {
  const items = discussions.map((discussion) => {
    return (
      <Discussion
        key={discussion.id}
        comment={discussion}
        replies={discussion.replies}
      />
    );
  });

  return <ul className={classes.container}>{items}</ul>;
};

export default Discussions;
