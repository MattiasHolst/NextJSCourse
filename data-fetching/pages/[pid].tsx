import fs from "fs/promises";
import { GetStaticPropsContext } from "next";
import path from "path";

export default function ProductDetailPage(props: {
  loadedProduct: ProductType;
}) {
  const { loadedProduct } = props;
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

type ProductType = {
  id: string;
  title: string;
  description: string;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  const productId = params?.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());

  const product = data.products.find(
    (product: ProductType) => product.id === productId
  );

  return { props: { loadedProduct: product } };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          pid: "p1",
        },
      },
      {
        params: {
          pid: "p2",
        },
      },
      {
        params: {
          pid: "p3",
        },
      },
    ],
    fallback: false,
  };
}
