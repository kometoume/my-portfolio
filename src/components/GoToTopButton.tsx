// src/components/GoToTopButton.tsx
'use client';

import React, { useState, useEffect } from 'react';

const GoToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          // rounded-full を削除し、ボタンを四角に
          className="bg-gray-600 hover:bg-gray-700 text-white p-3 shadow-lg transition-colors duration-300 ease-in-out focus:outline-none cursor-pointer active:scale-100 active:shadow-lg active:transform-none"
          aria-label="ページトップへ戻る"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L4 18H20L12 2Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default GoToTopButton;