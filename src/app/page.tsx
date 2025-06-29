// src/app/page.tsx
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-purple-100 text-purple-900">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-4 animate-bounce">
        Kometのスーパーポートフォリオ！
      </h1>
      <p className="text-xl text-center max-w-2xl leading-relaxed">
        ようこそ！これは私の素晴らしいWeb開発の成果を示すポートフォリオサイトです。
        ここには、私のスキルやこれまでのプロジェクトが紹介されています。
        どんどん更新していくので、お楽しみに！
      </p>
      <div className="mt-8">
        <a 
          href="https://github.com/kometoume" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
        >
          私のGitHubを見る！
        </a>
      </div>
    </main>
  );
}