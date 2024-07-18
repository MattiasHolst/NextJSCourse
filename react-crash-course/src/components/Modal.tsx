import { useNavigate } from "react-router-dom";
import classes from "./Modal.module.css";

interface ModalProps {
  children: JSX.Element;
}

function Modal(props: ModalProps) {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {props.children}
      </dialog>
    </>
  );
}

export default Modal;
