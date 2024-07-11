import { MdPostAdd, MdMessage } from "react-icons/md";

import classes from "./MainHeader.module.css";

interface MainHeaderProps {
  onCreatePost: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function MainHeader(props: MainHeaderProps) {
  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <MdMessage />
        React Poster
      </h1>
      <p>
        <button className={classes.button} onClick={props.onCreatePost}>
          <MdPostAdd size={18} />
          New Post
        </button>
      </p>
    </header>
  );
}

export default MainHeader;
