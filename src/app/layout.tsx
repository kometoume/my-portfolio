// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoToTopButton from "../components/GoToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "八木美智惠｜ポートフォリオ",
  description: "八木美智惠のポートフォリオサイトです。HTML/CSS/JavaScriptを中心にWebサイトを構築してきました。現在はReactやNext.jsを用いた開発にも携わっています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja"><body className={`${inter.className} bg-gray-100 text-gray-800`}>
      {children}
        <GoToTopButton />
    </body></html>
  );
}