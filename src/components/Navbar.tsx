// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link'; // ← この行を追加

interface NavbarProps {
  onContactClick: () => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex flex-col w-full">
      <div className="bg-blue-800 p-4 text-white shadow-md">
        <div className="container mx-auto flex flex-col items-center">
          {/* この行を正確に確認し、修正してください */}
          <Link href="/" className="text-3xl font-bold mb-4 md:mb-0"> {/* ここがポイント！href="/" の中の"/"と""が半角であることを確認 */}
            八木美智惠 ポートフォリオ
          </Link>
        </div>
      </div>

      {/* ナビゲーションセクション */}
      <div className="bg-blue-700 p-4 text-white shadow-md">
        <div className="container mx-auto flex flex-col md:flex-row md:justify-center md:items-center">
          {/* モバイルメニューボタン */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none self-end mb-4"
          >
            {isOpen ? (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>

          {/* ナビゲーションリンク */}
          <div
            className={`md:flex md:items-center md:space-x-8 ${
              isOpen ? 'block' : 'hidden'
            } w-full text-center md:w-auto`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 mt-4 md:mt-0">
              <li>
                <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-blue-200 text-xl">
                  About
                </a>
              </li>
              <li>
                <a href="#skills" onClick={() => setIsOpen(false)} className="hover:text-blue-200 text-xl">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => setIsOpen(false)} className="hover:text-blue-200 text-xl">
                  Projects
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onContactClick();
                  }}
                  className="hover:text-blue-200 text-xl"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}