import classes from "./Avatar.module.scss";

interface IAvatarProps {
  link: string | undefined;
  alt: string;
}

const Avatar = ({ link, alt }: IAvatarProps) => {
  if (link) {
    return <img className={classes.container} src={link} alt={alt} />;
  } else {
    const text = alt.split(" ");
    const subName = text[0].substring(0, 1) + text[1].substring(0, 1);
    return <div className={classes.container}>{subName}</div>;
  }
};

export default Avatar;
