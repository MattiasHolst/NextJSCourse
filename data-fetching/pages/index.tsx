import fs from "fs/promises";
import path from "path";

function HomePage(props: {
  products: {
    id: string;
    title: string;
  }[];
}) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  console.log("(RE-)Generating...");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return { props: { products: data.products }, revalidate: 10 };
}

export default HomePage;
