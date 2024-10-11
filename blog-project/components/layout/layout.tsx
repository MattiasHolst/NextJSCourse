import MainNavigation from "./main-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}
