import Header from "../components/layout/Header";
import { getCurrentUser } from "../lib/auth";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  let user = null;
  try {
    user = await getCurrentUser();
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }

  return (
    <>
      <Header user={user ?? null} />
      <main className="container mx-auto px-4 py-8 bg-black min-h-screen">
        {children}
      </main>
    </>
  );
};

export default MainLayout;
