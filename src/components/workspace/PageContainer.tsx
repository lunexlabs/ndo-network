import { ReactNode } from "react";

export default function PageContainer({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-6">

      {/* Page Title */}

      <h1 className="text-2xl font-bold">
        {title}
      </h1>

      {children}

    </div>
  );
}