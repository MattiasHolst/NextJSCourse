import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/mattias.jpg"
          alt="An image showing Mattias"
          width={500}
          height={500}
        />
      </div>
      <h1>Hi, I'm Mattias</h1>
      <p>
        I blog about web development - especially front end frameworks like
        React
      </p>
    </section>
  );
}
