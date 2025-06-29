// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "八木美智惠 ポートフォリオ",
  description: "ウェブ開発者八木美智惠のポートフォリオサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ★★★ここが肝心です！htmlタグの閉じカッコの直後にbodyタグの開始カッコが来るように、間を完全に詰めてください。
    // 手動でバックスペースキーを何度か押して、余分なスペースや改行を完全に削除してみてください。
    <html lang="ja"><body className={`${inter.className} bg-gray-100 text-gray-800`}>
      {/* <Navbar /> はコメントアウトされているので問題ありません */}
      {children}
    </body></html>
  );
}