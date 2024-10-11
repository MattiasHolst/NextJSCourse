import Image from "next/image";
import classes from "./post-header.module.css";

export default function PostHeader({
  title,
  imageUrl,
}: {
  title: string;
  imageUrl: string;
}) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={imageUrl} alt={title} width={200} height={150} />
    </header>
  );
}
