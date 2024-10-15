import Link from "next/link";
import classes from "@/styles/button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  if (props.link) {
    return (
      <Link className={classes.btn} href={props.link}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
