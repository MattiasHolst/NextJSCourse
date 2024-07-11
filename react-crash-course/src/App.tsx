import { useState } from "react";
import MainHeader from "./components/MainHeader";
import PostsList from "./components/PostsList";

function App() {
  const [modalOpen, setModalOpen] = useState(false);


  function showModalHandler() {
    setModalOpen(true);
  }

  function hideModalHandler() {
    setModalOpen(false);
  }
  return (
    <>
    <MainHeader onCreatePost={showModalHandler} />
    <main>
      <PostsList isPosting={modalOpen} onStopPosting={hideModalHandler} />
    </main>
    </>
  );
}

export default App;
