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

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data as { products: ProductType[] };
}

type ProductType = {
  id: string;
  title: string;
  description: string;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  const productId = params?.pid;

  const data = await getData();

  const product = data.products.find(
    (product: ProductType) => product.id === productId
  );

  return { props: { loadedProduct: product } };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: false,
  };
}
