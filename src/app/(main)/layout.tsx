import Header from "../components/layout/Header";
import { apiClient } from "../lib/apiClient";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  let user = null;
  try {
    user = await apiClient.getCurrentUser();
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
