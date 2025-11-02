import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Бочка | Barrel Forge",
  description: "Создавайте идеальную деревянную бочку прямо в браузере."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="bg-transparent">
        {children}
      </body>
    </html>
  );
}
