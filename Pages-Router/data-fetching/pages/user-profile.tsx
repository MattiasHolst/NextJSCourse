import { GetServerSidePropsContext } from "next";

type UserType = {
  username: string;
};

export default function UserProfilePage(props: UserType) {
  return <h1>{props.username}</h1>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, req, res } = context;


  return {
    props: {
      username: "Matte",
    },
  };
}
