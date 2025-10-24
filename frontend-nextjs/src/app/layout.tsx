import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Study Sync",
  description: "Study Sync Frontend Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
