// src/components/Navbar.tsx (一部修正)
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps { // 新しいPropsの型定義
  onContactClick: () => void; // Contactボタンクリック時に呼び出す関数
}

export default function Navbar({ onContactClick }: NavbarProps) { // propsを受け取る
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="p-4 bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          kometoume Portfolio
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          )}
        </button>

        <div
          className={`md:flex md:items-center md:space-x-4 ${
            isOpen ? 'block' : 'hidden'
          } absolute md:static top-16 left-0 right-0 bg-blue-700 md:bg-transparent p-4 md:p-0 w-full text-center md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4 md:mt-0">
            <li>
              <Link href="#about" onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                About
              </Link>
            </li>
            <li>
              <Link href="#skills" onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                Skills
              </Link>
            </li>
            <li>
              <Link href="#projects" onClick={() => setIsOpen(false)} className="hover:text-blue-200">
                Projects
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setIsOpen(false); // メニューを閉じる
                  onContactClick(); // 親から渡された関数を呼び出し、モーダルを開く
                }}
                className="hover:text-blue-200"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}