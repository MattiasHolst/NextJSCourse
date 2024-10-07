import Link from "next/link";
import classes from "@/styles/button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  link: string;
};

export default function Button(props: ButtonProps) {
  return (
    <Link className={classes.btn} href={props.link}>
      {props.children}
    </Link>
  );
}
