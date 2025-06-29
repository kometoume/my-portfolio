import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "../components/Navbar"; // この行を削除

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kometoume ポートフォリオ", // ポートフォリオのタイトルに変更
  description: "ウェブ開発者kometoumeのポートフォリオサイト", // ポートフォリオの説明に変更
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja"> {/* 日本語サイトなのでlang="ja"に */}
      {/* Tailwind CSSの基本スタイルをbodyに適用 */}
      <body className={`${inter.className} bg-gray-100 text-gray-800`}>
        {/* <Navbar /> */} {/* ここを削除 */}
        {children} {/* 各ページのコンテンツ（page.tsxなど）がここに表示されます */}
      </body>
    </html>
  );
}