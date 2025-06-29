'use client'; // クライアントコンポーネントとしてマーク

import { useState } from 'react';
import Link from 'next/link'; // ページ遷移にNext.jsのLinkを使う

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // メニューの開閉状態を管理

  return (
    <nav className="p-4 bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* ロゴやサイト名 */}
        <Link href="/" className="text-2xl font-bold">
          [あなたの名前/サイト名]
        </Link>

        {/* ハンバーガーアイコン (mdサイズ以下で表示) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? (
            // 閉じるアイコン (xマークなど)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            // ハンバーガーアイコン (3本線)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>

        {/* ナビゲーションメニュー (mdサイズ以上で常に表示、以下でハンバーガー開閉に連動) */}
        <div
          className={`md:flex md:items-center md:space-x-4 ${
            isOpen ? 'block' : 'hidden'
          } absolute md:static top-16 left-0 right-0 bg-blue-700 md:bg-transparent p-4 md:p-0 w-full text-center md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4 md:mt-0">
            <li>
              <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                自己紹介
              </Link>
            </li>
            <li>
              <Link href="/projects" onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                プロジェクト
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}