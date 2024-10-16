import { FormEvent, useRef } from "react";
import classes from "./profile-form.module.css";

interface Props {
  onChangePassword: (passwordData: {
    oldPassword: string;
    newPassword: string;
  }) => void;
}

function ProfileForm(props: Props) {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordref = useRef<HTMLInputElement>(null);
  function submitHandler(event: FormEvent) {
    event.preventDefault();

    const oldPassword = oldPasswordRef.current?.value;
    const newPassword = newPasswordref.current?.value;

    if (!oldPassword || !newPassword) {
      return;
    }

    props.onChangePassword({
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordref} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
