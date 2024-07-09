const names = ['Mattias', 'Gandalf'];

function Post() {
    const chosenName = Math.random() > 0.5 ? names[0] : names[1];
  return (
    <div>
      <p>{chosenName}</p>
      <p>React.js is cool!</p>
    </div>
  );
}

export default Post;
