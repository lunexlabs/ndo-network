import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

export default function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 lg:grid-cols-2">
        <div className="hidden border-r border-gray-200 px-10 py-16 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-600">
              NDO Network
            </p>

            <h1 className="mt-6 max-w-md text-5xl font-bold leading-tight">
              Join the community behind the content.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600">
              Create an account to manage your profile, connect with the
              community, and get ready for features like Fan Wall identity,
              submissions, and future account tools.
            </p>
          </div>

          <div className="text-sm text-gray-500">
            Built clean for growth, route protection, and Vercel deployment.
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-12 sm:px-8">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}