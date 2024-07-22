import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <img src="/logo.png" alt="cool image" />
      <h1>Welcome to this NextJS Course!</h1>
      <p> Let's get started!</p>
      <p><Link href="/about">About Us</Link></p>
    </main>
  );
}
