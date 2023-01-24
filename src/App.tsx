import classes from "./App.module.scss";
import Discussion from "./components/Discussions/Discussions";
import UserComment from "./components/UserComment/UserComment";
import { useAppSelector } from "./store/hooks";
const App = () => {
  const data = useAppSelector((state) => state.discussion);

  return (
    <div className={classes.container}>
      <UserComment />
      <div>
        <Discussion discussions={data} />
      </div>
    </div>
  );
};

export default App;
