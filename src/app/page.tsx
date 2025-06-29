// src/app/page.tsx
'use client'; // useStateを使うため

import { useState } from 'react';
import Navbar from '../components/Navbar'; // ここでNavbarをインポート
import Modal from '../components/Modal';
import ContactForm from '../components/ContactForm';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbarをここで呼び出し、onContactClickを渡す */}
      <Navbar onContactClick={() => setIsModalOpen(true)} /> 

      <main className="flex-grow container mx-auto p-4 sm:p-8">
        {/* About Section */}
        <section id="about" className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-600 pb-2">About Me</h2>
          <p className="text-lg">
            こんにちは！私はウェブ開発者のkometoumeです。フロントエンドからバックエンドまで幅広く対応します。
            ユーザーが使いやすく、美しいデザインと高いパフォーマンスを両立させたウェブアプリケーションの開発を得意としています。
            新しい技術を学ぶことに常に情熱を燃やし、日々の課題を解決するソリューションを創造することを目指しています。
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-600 pb-2">Skills</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-lg">
            <li className="bg-blue-50 p-3 rounded-md">HTML / CSS / JavaScript</li>
            <li className="bg-blue-50 p-3 rounded-md">React / Next.js</li>
            <li className="bg-blue-50 p-3 rounded-md">Node.js / Express</li>
            <li className="bg-blue-50 p-3 rounded-md">Git / GitHub</li>
            <li className="bg-blue-50 p-3 rounded-md">Tailwind CSS</li>
            <li className="bg-blue-50 p-3 rounded-md">TypeScript</li>
            {/* その他のスキルもここに追加 */}
          </ul>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-600 pb-2">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="project-card border border-gray-200 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">プロジェクトA (Todoアプリ)</h3>
              <p className="text-gray-700 mb-3">Reactを使ったTodoアプリ。タスクの追加・削除・完了が可能。</p>
              <a 
                href="https://github.com/kometoume/project-a" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHubを見る
              </a>
            </div>
            <div className="project-card border border-gray-200 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">プロジェクトB (メモ管理API)</h3>
              <p className="text-gray-700 mb-3">Node.jsを使ったREST API。簡単なメモ管理サービス。</p>
              <a 
                href="https://github.com/kometoume/project-b" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHubを見る
              </a>
            </div>
            {/* 他のプロジェクトもここに追加 */}
          </div>
        </section>

        {/* お問い合わせボタン（Navbarから開くので、このページの直下に置く必要がなければ削除してもOK） */}
        <section className="text-center mt-8">
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-lg text-lg font-bold"
            >
                お問い合わせはこちら (メインコンテンツ内)
            </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-gray-800 text-white text-center mt-8">
        <p>&copy; {new Date().getFullYear()} kometoume Portfolio. All rights reserved.</p>
      </footer>

      {/* Contact Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm />
      </Modal>
    </div>
  );
}