// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // ★★★ 1. scrolled ステートの定義を削除 ★★★
  // const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // ★★★ 2. scrolled に関連する useEffect の中身を削除（または useEffect 自体を削除） ★★★
    // const handleScroll = () => {
    //   setScrolled(window.scrollY > 0);
    // };
    // window.addEventListener('scroll', handleScroll);
    // handleScroll();
    // return () => {
    //   window.removeEventListener('scroll', handleScroll);
    // };
    // 今回のケースでは、この useEffect は完全に不要になります
  }, []); // 依存配列も空のままでOK

  // scrollToSection 関数も、scroll-margin-top に任せるため削除またはコメントアウト
  // const scrollToSection = (id: string) => { /* ... */ };

  return (
    <>
      <header
        // ★★★ 3. scrolled に依存する className と style を修正 ★★★
        // scrolled がなくなったので、常に fixed スタイルを適用
        className={`fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50 transition-all duration-300 ease-in-out`}
        // style={scrolled ? { boxShadow: '0 2px 4px rgba(0,0,0,0.1)' } : {}} // この行も不要
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-white">
            八木美智惠 ポートフォリオ
          </Link>

          {/* PCメニュー */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 lg:space-x-8 text-lg">
              <li>
                {/* href属性でscroll-margin-topに任せるため、onClickは不要 */}
                <a href="#about" className="hover:text-blue-200">About</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-200">Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-200">Projects</a>
              </li>
              <li>
                <button onClick={onContactClick} className="hover:text-blue-200 cursor-pointer">
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* モバイルハンバーガーアイコン */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white md:hidden focus:outline-none p-2"
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

      {/* モバイルメニューオーバーレイ - 変更なし */}
      <nav
        className={`fixed top-0 left-0 w-full bg-black bg-opacity-90 text-white z-50 transition-opacity duration-300 ease-in-out
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ height: '350px' }} // 例として350px。ここを調整してください。
        aria-hidden={!isMobileMenuOpen}
      >
        {/* メニュー内のXボタン */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white focus:outline-none p-2"
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
          <ul className="flex flex-col items-center space-y-6 text-2xl">
            <li>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-200">About</a>
            </li>
            <li>
              <a href="#skills" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-200">Skills</a>
            </li>
            <li>
              <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-blue-200">Projects</a>
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
    </>
  );
}