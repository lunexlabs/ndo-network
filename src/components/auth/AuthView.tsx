"use client";

import { useState } from "react";
import AuthShell from "./AuthShell";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type AuthViewProps = {
  initialMessage?: string;
};

export default function AuthView({ initialMessage }: AuthViewProps) {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <AuthShell>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            {mode === "login"
              ? "Log in to manage your NDO account."
              : "Join NDO and get ready for community features."}
          </p>
        </div>

        <AuthTabs mode={mode} onChange={setMode} />

        {mode === "login" ? (
          <LoginForm initialMessage={initialMessage} />
        ) : (
          <RegisterForm />
        )}
      </div>
    </AuthShell>
  );
}