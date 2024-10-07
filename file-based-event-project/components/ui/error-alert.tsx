import classes from "@/styles/error-alert.module.css";

type ErrorAlertType = {
  children: React.ReactNode;
};

function ErrorAlert(props: ErrorAlertType) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
