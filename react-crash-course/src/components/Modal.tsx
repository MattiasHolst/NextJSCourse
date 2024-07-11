import classes from "./Modal.module.css";

interface ModalProps{
    children: JSX.Element;
    onClose: React.MouseEventHandler<HTMLDivElement>;
}

function Modal(props: ModalProps) {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose} />
      <dialog open className={classes.modal}>{props.children}</dialog>
    </>
  );
}

export default Modal;
