"use client";

type AuthTabsProps = {
  mode: "login" | "register";
  onChange: (mode: "login" | "register") => void;
};

export default function AuthTabs({ mode, onChange }: AuthTabsProps) {
  return (
    <div className="mb-6 flex rounded-xl border border-gray-200 bg-gray-100 p-1">
      <button
        type="button"
        onClick={() => onChange("login")}
        className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
          mode === "login"
            ? "bg-white text-black shadow-sm"
            : "text-gray-600 hover:text-black"
        }`}
      >
        Login
      </button>

      <button
        type="button"
        onClick={() => onChange("register")}
        className={`flex-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
          mode === "register"
            ? "bg-white text-black shadow-sm"
            : "text-gray-600 hover:text-black"
        }`}
      >
        Register
      </button>
    </div>
  );
}