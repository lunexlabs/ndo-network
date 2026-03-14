import type { ReactNode } from "react";
import { requireAdmin } from "@/src/lib/auth/requireAdmin";

type NdoAdminPortalLayoutProps = {
  children: ReactNode;
};

export default async function NdoAdminPortalLayout({
  children,
}: NdoAdminPortalLayoutProps) {
  await requireAdmin();

  return <>{children}</>;
}