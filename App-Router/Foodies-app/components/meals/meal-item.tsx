import Link from "next/link";
import Image from "next/image";

import classes from "./meal-item.module.css";
import { MealItem as meal} from "./meals-grid";


export default function MealItem(mealItem: meal) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={mealItem.path} alt={mealItem.title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{mealItem.title}</h2>
          <p>by {mealItem.creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{mealItem.summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${mealItem.slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
