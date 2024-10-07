import MainHeader from "./main.header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
}
