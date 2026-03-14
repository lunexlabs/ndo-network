import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Card({ children }: Props) {
  return (
    <div
      className="
        relative
        bg-white/70
        backdrop-blur-sm
        border
        border-gray-200
        rounded-2xl
        shadow-[0_6px_18px_rgba(0,0,0,0.05)]
        p-6
        overflow-hidden
      "
    >
      {/* soft gradient overlay */}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-pink-100/30" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}