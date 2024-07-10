import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList() {
  return (
    <>
      <NewPost />
      <ul className={classes.posts}>
        <Post author="Mattias" body="React.js is awesome!" />
        <Post author="Gandalf" body="Brotherhood" />
      </ul>
    </>
  );
}

export default PostsList;
