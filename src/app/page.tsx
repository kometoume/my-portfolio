// src/app/page.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import ContactForm from '../components/ContactForm';
import Image from 'next/image';

import { Project, projects } from '../data/projects';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [navbarPortalNode, setNavbarPortalNode] = useState<ReturnType<typeof createHtmlPortalNode> | null>(null);
  const [pcNavbarHeight, setPcNavbarHeight] = useState(0); // PC用ナビゲーションの高さを保持

  // モバイルヘッダーの高さは固定値で定義（Navbar.tsxと合わせる）
  const mobileHeaderHeightValue = 82; // pxを省いて数値として定義
  const mobileHeaderHeight = `${mobileHeaderHeightValue}px`; // 文字列として保持

  useEffect(() => {
    if (typeof window !== 'undefined' && !navbarPortalNode) {
      setNavbarPortalNode(createHtmlPortalNode());
    }

    const updatePcNavbarHeight = () => {
      if (navbarPortalNode && navbarPortalNode.current) {
        const navbarDom = navbarPortalNode.current;
        const pcNavElement = navbarDom.querySelector('nav.bg-gray-600.fixed');

        if (pcNavElement) {
          setPcNavbarHeight(pcNavElement.offsetHeight);
        } else {
          const relativePcNavElement = navbarDom.querySelector('nav.bg-gray-600.relative');
          if (relativePcNavElement) {
            setPcNavbarHeight(relativePcNavElement.offsetHeight);
          }
        }
      }
    };

    updatePcNavbarHeight();
    window.addEventListener('resize', updatePcNavbarHeight);
    window.addEventListener('scroll', updatePcNavbarHeight);

    return () => {
      window.removeEventListener('resize', updatePcNavbarHeight);
      window.removeEventListener('scroll', updatePcNavbarHeight);
    };
  }, [navbarPortalNode]);


  if (!navbarPortalNode) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <InPortal node={navbarPortalNode}>
        <Navbar onContactClick={() => setIsModalOpen(true)} />
      </InPortal>

      <OutPortal node={navbarPortalNode} />

      <main
        className={`flex-grow container mx-auto p-4 sm:p-8`}
        style={{
          // PC (md以上) とモバイルで padding-top を出し分ける
          // window.innerWidth を使って動的にスタイルを適用
          paddingTop: typeof window !== 'undefined' && window.innerWidth >= 768 // mdブレークポイント (768px)
            ? `${pcNavbarHeight}px` // PC表示時
            : `calc(${mobileHeaderHeight} + 1rem)` // モバイル表示時
        }}
      >
        {/* ... 以降のコンテンツは変更なし ... */}
        {/* About Me Section */}
        <section id="about" className="bg-white p-6 mb-8 rounded-lg shadow-md mt-8">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-800 pb-2 text-gray-800">About Me</h2>
          <p className="text-lg mb-4 text-gray-900">
            Webコーダーの八木美智惠です。大学院修了後、美術教員および教育機関の助手として教育現場で経験を積みました。その後、職業訓練校でWebデザインの知識を習得。現在は正社員のWebコーダーとして5年間、フルリモート環境下で業務に従事しています。自己管理を意識しながら業務を遂行し、円滑なコミュニケーションを心がけています。
          </p>
          <p className="text-lg text-gray-900">
            Web制作に携わる中で、より高い専門性を身につけスキルを向上させたいという思いが強まり、今後の成長を見据えて転職を決意いたしました。これまでの実務経験を活かし、新しい環境にも柔軟に対応しながら、さらなる成長を目指して前向きに取り組んでまいります。
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-800 pb-2 text-gray-800">Skills</h2>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">フロントエンド開発</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
                HTML / CSS / JavaScript
                <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">5年</span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
                React / Next.js
                <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                  学習中
                </span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
                Tailwind CSS
                <span className="ml-2 px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded-full">
                  学習中
                </span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
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
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
                WordPress
                <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white text-xs font-semibold rounded-full">
                  1年
                </span>
              </li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-gray-800">バックエンド開発</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
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
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
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
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
                Adobe Photoshop
                <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">5年</span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
                Adobe Illustrator
                <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-semibold rounded-full">5年</span>
              </li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm text-gray-800">
                Adobe Premiere Pro
                <span className="ml-2 px-2 py-0.5 bg-purple-500 text-white text-xs font-semibold rounded-full">
                  1年
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-800 pb-2 text-gray-800">Projects</h2>
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
                        className="w-full aspect-[700/300] object-contain rounded-md border border-gray-200"
                        width={700}
                        height={300}
                      />
                    </div>
                  )}
                  {/* プロジェクトタイトル */}
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{project.title}</h3>
                  {/* 説明 */}
                  <p className="text-gray-800 mb-4">{project.description}</p>
                  {/* 使用技術 */}
                  {project.technologies.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">使用技術:</h4>
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
                      <h4 className="text-lg font-semibold mb-2 text-gray-800">ポイント:</h4>
                      <ul className="list-disc list-inside text-gray-800">
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