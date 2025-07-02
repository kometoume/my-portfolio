// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // スクロール状態を管理

  useEffect(() => {
    const handleScroll = () => {
      // 50px 以上スクロールしたら `scrolled` を true にする
      setScrolled(window.scrollY > 50);
    };

    // コンポーネントマウント時にリスナーを追加
    window.addEventListener('scroll', handleScroll);
    // 初期ロード時のスクロール位置をチェック
    handleScroll();

    // コンポーネントアンマウント時にリスナーを削除
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <>
      {/* PC表示用ヘッダー (mdブレークポイント以上で表示) */}
      <div className="hidden md:block">
        {/* ロゴセクション (PC用 - スクロールで隠れる) */}
        <div className="bg-white p-4 text-gray-800 shadow-md">
          <div className="container mx-auto flex flex-col items-center">
            <Link href="/" className="text-3xl font-bold mb-4 md:mb-0">
              八木美智惠 ポートフォリオ
            </Link>
          </div>
        </div>

        {/* グローバルメニューセクション (PC用 - スクロールで固定) */}
        <nav
          className={`bg-gray-600 p-4 text-white shadow-md z-50 transition-all duration-300 ease-in-out
            ${scrolled ? 'fixed top-0 w-full' : 'relative'}`}
          style={scrolled ? { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } : {}}
        >
          <div className="container mx-auto flex md:flex-row md:justify-center md:items-center">
            <ul className="flex flex-row space-x-8 w-full justify-center text-lg">
              <li>
                <a href="#about" className="hover:text-blue-200 text-xl">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-200 text-xl">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-200 text-xl">
                  Projects
                </a>
              </li>
              <li>
                <button onClick={onContactClick} className="hover:text-blue-200 text-xl cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* モバイル表示用ヘッダー (mdブレークポイント以下で表示) */}
      <div className="md:hidden">
        {/* 固定されるモバイルヘッダーバー（ロゴとハンバーガーアイコン） */}
        {/* このheaderはメニューが開いていないときに表示され、メニューが開くとz-indexで背後に回るイメージ */}
        <header className="fixed top-0 left-0 w-full bg-white p-4 text-gray-800 shadow-md z-40">
          {' '}
          {/* z-indexを40に下げる */}
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold">
              八木美智惠 ポートフォリオ
            </Link>
            {/* ハンバーガーアイコン/Xボタン - これはメニューオーバーレイのXボタンに置き換えられるので、ここではボタンのスタイルはそのまま */}
            {/* ここではハンバーガーアイコンのみ表示し、Xボタンはメニューオーバーレイ内に配置する形にする */}
            <button
              onClick={() => setIsMobileMenuOpen(true)} // クリックでメニューを開く
              className="text-gray-800 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </header>

        {/* モバイルメニューオーバーレイ */}
        <nav
  className={`fixed top-0 left-0 w-full bg-black bg-opacity-90 text-white z-50 transition-opacity duration-300 ease-in-out
    ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} // ★変更点1: スライドインではなくフェードイン/アウトに★
         style={{ height: 'calc(350px)' }} /* ★この行を再追加し、値を調整★ */
  aria-hidden={!isMobileMenuOpen} // スクリーンリーダー対応
>
          {/* メニュー内のXボタン（右上に固定、白色） */}
          <div className="absolute top-4 right-4 z-50">
            {' '}
            {/* z-indexを高くして最前面に */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white focus:outline-none p-2" // Xボタンの色を白に
              aria-label="Close menu"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div className="container mx-auto flex flex-col items-center mt-16">
            {' '}
            {/* メニュー項目を上部に配置するためmt-16を追加 */}
            <ul className="flex flex-col items-center space-y-6 text-2xl">
              <li>
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-200">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-200">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-200">
                  Projects
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="hover:text-blue-200 cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
