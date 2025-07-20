import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Аэроспецстрой",
  description: "Мы создаем будущее",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
