// src/app/page.tsx

'use client'; // これは既にファイルの先頭にあるはずです

import { useState, useRef, useEffect } from 'react'; // useMemo を削除しました
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import ContactForm from '../components/ContactForm';
import Image from 'next/image';

import { Project, projects } from '../data/projects';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ★★★ 重要な修正点ここから ★★★
  // navbarPortalNode を null で初期化。クライアントサイドでのみ設定されるようにします。
  const [navbarPortalNode, setNavbarPortalNode] = useState<ReturnType<typeof createHtmlPortalNode> | null>(null);
  const fixedNavbarRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // このコードは、'window' と 'document' が存在するブラウザでのみ実行されます。
    // useEffect自体がクライアントサイドでの実行を意味しますが、念のためtypeof window !== 'undefined'で安全性を高めています。
    if (typeof window !== 'undefined' && !navbarPortalNode) {
      setNavbarPortalNode(createHtmlPortalNode());
    }

    const updateNavbarHeight = () => {
      if (fixedNavbarRef.current) {
        setNavbarHeight(fixedNavbarRef.current.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);

    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, [navbarPortalNode]); // navbarPortalNode がセットされたら（最初の1回だけ）再実行しないように依存配列に追加

  // navbarPortalNode がまだ初期化されていない場合（サーバー上またはクライアントでuseEffectが実行される前）は、
  // それに依存するコンテンツをレンダリングしないようにします。代わりにローディングスピナーなどを返すこともできます。
  if (!navbarPortalNode) {
    return null; // または <LoadingSpinner />
  }
  // ★★★ 重要な修正点ここまで ★★★

  return (
    <div className="flex flex-col min-h-screen">
      {/* Portal の使用箇所は変更なし */}
      <InPortal node={navbarPortalNode}>
        <Navbar onContactClick={() => setIsModalOpen(true)} />
      </InPortal>

      <div ref={fixedNavbarRef} className="fixed top-0 left-0 w-full z-50">
        <OutPortal node={navbarPortalNode} />
      </div>

      <main className={`flex-grow container mx-auto p-4 sm:p-8`} style={{ paddingTop: `${navbarHeight}px` }}>
        {/* ... 以降のコンテンツは変更なし ... */}

        {/* About Me Section */}
        <section id="about" className="bg-white p-6 mb-8 rounded-lg shadow-md mt-8">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-800 pb-2">About Me</h2>
          <p className="text-lg mb-4">
            Webコーダーの八木美智惠です。大学院修了後、美術教員および教育機関の助手として教育現場で経験を積みました。その後、職業訓練校でWebデザインの知識を習得。現在は正社員のWebコーダーとして5年間、フルリモート環境下で業務に従事しています。自己管理を意識しながら業務を遂行し、円滑なコミュニケーションを心がけています。
          </p>
          <p className="text-lg">
            Web制作に携わる中で、より高い専門性を身につけスキルを向上させたいという思いが強まり、今後の成長を見据えて転職を決意いたしました。これまでの実務経験を活かし、新しい環境にも柔軟に対応しながら、さらなる成長を目指して前向きに取り組んでまいります。
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-800 pb-2">Skills</h2>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">フロントエンド開発</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                HTML / CSS / JavaScript
                <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">5年</span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                React / Next.js
                <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                  学習中
                </span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                Tailwind CSS
                <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                  学習中
                </span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                TypeScript
                <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                  学習中
                </span>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">CMS</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                WordPress
                <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white text-xs font-semibold rounded-full">
                  2年 
                </span>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">バックエンド開発</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                Node.js
                <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                  学習中
                </span>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">バージョン管理</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                Git / GitHub
                <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                  学習中
                </span>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">デザインツール</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                Adobe Photoshop
                <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">5年</span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                Adobe Illustrator
                <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">5年</span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">
                Adobe Premiere Pro
                <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white text-xs font-semibold rounded-full">
                  2年
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-800 pb-2">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(
              (
                project: Project, // Project型を明示的に指定
              ) => (
                <div
                  key={project.id}
                  className="project-card border border-gray-200 p-6 rounded-lg shadow-lg bg-gray-50 hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  {/* プロジェクト画像 */}
                  {project.image && (
                    <div className="mb-4">
                      <Image
                        src={project.image}
                        alt={`${project.title} のスクリーンショット`}
                        className="w-full aspect-[700/300] object-contain rounded-md border border-gray-200" // この行を追加/変更
                        width={700}
                        height={300}
                      />
                    </div>
                  )}
                  {/* プロジェクトタイトル */}
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{project.title}</h3>
                  {/* 説明 */}
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  {/* 使用技術 */}
                  {project.technologies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2 text-gray-700">使用技術:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* 工夫した点/ポイント */}
                  {project.points.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2 text-gray-700">ポイント:</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        {project.points.map((point, index) => (
                          <li key={index} className="mb-1">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {/* リンクボタン */}
                  <div className="flex flex-wrap gap-3 mt-auto pt-4 border-t border-gray-200">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-gray-700 transition-colors shadow-md flex-1 text-center"
                      >
                        Webサイト
                      </a>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        </section>

        {/* お問い合わせボタン */}
        <section className="text-center mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-green-600 text-white rounded-full hover:bg-gray-700 transition-colors shadow-lg text-lg font-bold cursor-pointer"
          >
            お問い合わせはこちら
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-gray-800 text-white text-center mt-8">
        <p>&copy; {new Date().getFullYear()} MichieYagi Portfolio. All rights reserved.</p>
      </footer>

      {/* Contact Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ContactForm />
      </Modal>
    </div>
  );
}
