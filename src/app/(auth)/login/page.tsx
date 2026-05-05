"use client";

import { apiClient } from "@/app/lib/apiClient";
import Link from "next/link";
import { useActionState } from "react";

export type LoginState = {
  error?: string;
  success?: boolean;
};

const LoginPage = () => {
  const [state, LoginAction, isPending] = useActionState(
    async (prevState: LoginState, formData: FormData): Promise<LoginState> => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      try {
        await apiClient.login(email, password);
        window.location.href = "/dashboard";
        return { success: true };
      } catch (error) {
        return {
          error: error instanceof Error ? error.message : "Login Failed",
        };
      }
    },
    { error: undefined, success: undefined },
  );
  return (
    <div className="bg-slate-800 p-8 rounded-lg border border-slate-700 w-full max-w-md">
      <form action={LoginAction}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">
            Sign In To Your Account
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Or <br></br>
            <Link
              href="/register"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Create New Account!
            </Link>
          </p>
        </div>
        {state?.error && (
          <div className="bg-red-900/50 border ">{state.error}</div>
        )}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:ring-2"
              placeholder="Enter Your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 rounded-md bg-slate-900 border border-slate-700 focus:ring-2"
              placeholder="Create a password"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className=" flex justify-center items-center rounded-md w-full border bg-blue-700 py-2 mt-5 cursor-pointer hover:scale-105 duration-500"
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
