import AuthForm from "@/components/auth-form";

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Home({ searchParams }: PageProps) {
  if (searchParams.mode === "login" || searchParams.mode === "signup") {
    const formMode = searchParams.mode || "login";
    return <AuthForm mode={formMode} />;
  } else {
    return <AuthForm mode="login" />;
  }
}
