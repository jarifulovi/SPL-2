import { ReactNode } from "react";

interface GroupLayoutProps {
  children: ReactNode;
  params: Promise<{ groupId: string }>;
}

export default async function GroupLayout({
  children,
}: GroupLayoutProps) {
  return <>{children}</>;
}
