import classes from "./Modal.module.css";

function Modal(props: { children: JSX.Element, onClose: React.MouseEventHandler<HTMLDivElement> }) {
  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose} />
      <dialog open className={classes.modal}>{props.children}</dialog>
    </>
  );
}

export default Modal;
