import { apiClient } from "@/app/lib/apiClient";
import { useActionState } from "react";

export type RegisterState = {
  error?: string;
  success?: boolean;
};

const RegisterPage = () => {
  const [state, registerAction, isPending] = useActionState(
    async (
      prevState: RegisterState,
      formData: FormData,
    ): Promise<RegisterState> => {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const teamCode = formData.get("teamCode") as string;
      try {
        await apiClient.register({
          name,
          email,
          password,
          teamCode: teamCode || undefined,
        });
        window.location.href = "/dashboard";
        return { success: true };
      } catch (error) {
        return {
          error:
            error instanceof Error ? error.message : "Registeration Failed",
        };
      }
    },
    { error: undefined, success: undefined },
  );
  return (
    <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 w-full max-w-m">
        
    </div>
  );
};
