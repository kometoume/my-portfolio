// src/app/page.tsx
"use client"; // useStateを使うため

import { useState } from "react";
import Navbar from "../components/Navbar"; // ここでNavbarをインポート
import Modal from "../components/Modal";
import ContactForm from "../components/ContactForm";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの開閉状態

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbarをここで呼び出し、onContactClickを渡す */}
      <Navbar onContactClick={() => setIsModalOpen(true)} />

      <main className="flex-grow container mx-auto p-4 sm:p-8">
        {/* About Section */}
        <section id="about" className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
            About Me
          </h2>
          <p className="text-lg mb-4">
            {" "}
            {/* 最初の段落のまとまり */}
            Web開発者の八木美智惠です。大学院修了後、美術教員および教育機関の助手として教育現場で経験を積みました。その後、職業訓練校でWebデザインの知識を習得。現在は正社員のWebコーダーとして5年間、フルリモート環境下で業務に従事しています。自己管理を意識しながら業務を遂行し、円滑なコミュニケーションを心がけています。
          </p>
          <p className="text-lg">
            {" "}
            {/* 2つ目の段落のまとまり */}
            Web制作に携わる中で、より高い専門性を身につけスキルを向上させたいという思いが強まり、今後の成長を見据えて転職を決意いたしました。これまでの実務経験を活かし、新しい環境にも柔軟に対応しながら、さらなる成長を目指して前向きに取り組んでまいります。
          </p>
        </section>

        {/* Skills Section */}
<section id="skills" className="bg-white p-6 mb-8 rounded-lg shadow-md">
  <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
    Skills
  </h2>

  {/* フロントエンド開発 */}
  <div className="mb-6"> {/* 各カテゴリの下に余白を追加 */}
    <h3 className="text-2xl font-semibold mb-3 text-blue-700">フロントエンド開発</h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg"> {/* gapを少し小さくして、グループ感を出す */}
      <li className="bg-blue-50 p-3 rounded-md shadow-sm">HTML / CSS / JavaScript</li>
      <li className="bg-blue-50 p-3 rounded-md shadow-sm">React / Next.js</li>
      <li className="bg-blue-50 p-3 rounded-md shadow-sm">Tailwind CSS</li>
      <li className="bg-blue-50 p-3 rounded-md shadow-sm">TypeScript</li>
    </ul>
  </div>

  {/* バックエンド開発 (またはサーバーサイドの知識) */}
  <div className="mb-6">
    <h3 className="text-2xl font-semibold mb-3 text-blue-700">バックエンド開発</h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
      {/* Expressを残す場合はここに追加 */}
      <li className="bg-blue-50 p-3 rounded-md shadow-sm">Node.js</li>
    </ul>
  </div>

  {/* バージョン管理 */}
  <div className="mb-6">
    <h3 className="text-2xl font-semibold mb-3 text-blue-700">バージョン管理</h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
      <li className="bg-blue-50 p-3 rounded-md shadow-sm">Git / GitHub</li>
    </ul>
  </div>


  { <div className="mb-6">
    <h3 className="text-2xl font-semibold mb-3 text-blue-700">デザインツール</h3>
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
      <li className="bg-blue-50 p-3 rounded-md shadow-sm">Adobe Photoshop</li>
      <li className="bg-blue-50 p-3 rounded-md shadow-sm">Adobe Illustrator</li>
      <li className="bg-blue-50 p-3 rounded-md shadow-sm">Adobe Premiere Pro</li>
    </ul>
  </div> }
</section>

        {/* Projects Section */}
        <section
          id="projects"
          className="bg-white p-6 mb-8 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="project-card border border-gray-200 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">
                プロジェクトA (Todoアプリ)
              </h3>
              <p className="text-gray-700 mb-3">
                Reactを使ったTodoアプリ。タスクの追加・削除・完了が可能。
              </p>
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
              <h3 className="text-xl font-semibold mb-2">
                プロジェクトB (メモ管理API)
              </h3>
              <p className="text-gray-700 mb-3">
                Node.jsを使ったREST API。簡単なメモ管理サービス。
              </p>
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
        <p>
          &copy; {new Date().getFullYear()} kometoume Portfolio. All rights
          reserved.
        </p>
      </footer>

      {/* Contact Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm />
      </Modal>
    </div>
  );
}
