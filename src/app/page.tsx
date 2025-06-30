// app/page.tsx

"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { createHtmlPortalNode, InPortal, OutPortal } from 'react-reverse-portal';
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import ContactForm from "../components/ContactForm";

// ★ここを変更: data/projects.ts から Project と projects をインポート
import { Project, projects } from "../data/projects";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navbarPortalNode = useMemo(() => createHtmlPortalNode(), []);
  const fixedNavbarRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const updateNavbarHeight = () => {
      if (fixedNavbarRef.current) {
        setNavbarHeight(fixedNavbarRef.current.offsetHeight);
      }
    };

    updateNavbarHeight();
    window.addEventListener("resize", updateNavbarHeight);

    return () => {
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <InPortal node={navbarPortalNode}>
        <Navbar onContactClick={() => setIsModalOpen(true)} />
      </InPortal>

      <div
        ref={fixedNavbarRef}
        className="fixed top-0 left-0 w-full z-50"
      >
        <OutPortal node={navbarPortalNode} />
      </div>

      <main
        className={`flex-grow container mx-auto p-4 sm:p-8`}
        style={{ paddingTop: `${navbarHeight}px` }}
      >
        {/* About Me Section */}
        <section id="about" className="bg-white p-6 mb-8 rounded-lg shadow-md mt-8">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
            About Me
          </h2>
          <p className="text-lg mb-4">
            Web開発者の八木美智惠です。大学院修了後、美術教員および教育機関の助手として教育現場で経験を積みました。その後、職業訓練校でWebデザインの知識を習得。現在は正社員のWebコーダーとして5年間、フルリモート環境下で業務に従事しています。自己管理を意識しながら業務を遂行し、円滑なコミュニケーションを心がけています。
          </p>
          <p className="text-lg">
            Web制作に携わる中で、より高い専門性を身につけスキルを向上させたいという思いが強まり、今後の成長を見据えて転職を決意いたしました。これまでの実務経験を活かし、新しい環境にも柔軟に対応しながら、さらなる成長を目指して前向きに取り組んでまいります。
          </p>
        </section>

        {/* Skills Section */}
        <section id="skills" className="bg-white p-6 mb-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
            Skills
          </h2>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-blue-700">フロントエンド開発</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">HTML / CSS / JavaScript</li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">React / Next.js</li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">Tailwind CSS</li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">TypeScript</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-blue-700">バックエンド開発</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">Node.js</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-blue-700">バージョン管理</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">Git / GitHub</li>
            </ul>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-3 text-blue-700">デザインツール</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-lg">
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">Adobe Photoshop</li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">Adobe Illustrator</li>
              <li className="bg-blue-50 p-3 rounded-md shadow-sm">Adobe Premiere Pro</li>
            </ul>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="bg-white p-6 mb-8 rounded-lg shadow-md"
        >
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-blue-600 pb-2">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="project-card border border-gray-200 p-6 rounded-lg shadow-lg bg-gray-50 hover:shadow-xl transition-shadow duration-300 flex flex-col">
                {/* プロジェクト画像 */}
                {project.image && (
                  <div className="mb-4">
                    <img
                      src={project.image}
                      alt={`${project.title} のスクリーンショット`}
                      className="w-full h-48 object-cover rounded-md border border-gray-200"
                    />
                  </div>
                )}

                {/* プロジェクトタイトル */}
                <h3 className="text-2xl font-bold mb-2 text-blue-800">
                  {project.title}
                </h3>

                {/* 説明 */}
                <p className="text-gray-700 mb-4 flex-grow">
                  {project.description}
                </p>

                {/* 使用技術 */}
                {project.technologies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">使用技術:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
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
                    <ul className="list-disc list-inside text-gray-700">
                      {project.points.map((point, index) => (
                        <li key={index} className="mb-1">{point}</li>
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
                      className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md flex-1 text-center"
                    >
                      デモを見る
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors shadow-md flex-1 text-center"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* お問い合わせボタン */}
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