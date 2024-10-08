import { GetServerSidePropsContext } from "next";

type UserType = {
  id: string;
};

export default function UserIdPage(props: UserType) {
  return <h1>{props.id}</h1>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const userId = params?.uid;

  return {
    props: {
      id: "userid-" + userId,
    },
  };
}
