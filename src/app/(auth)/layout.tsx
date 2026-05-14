import Header from "../components/layout/Header";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen flex items-center flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950"
      suppressHydrationWarning
    >
      {children}
    </div>
  );
};

export default AuthLayout;
