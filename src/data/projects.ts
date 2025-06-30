// data/projects.ts

// プロジェクトのデータ構造を定義
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // 画像のパス
  technologies: string[];
  githubLink?: string; // GitHubリポジトリのURL (任意)
  demoLink?: string; // デモサイトのURL (任意)
  points: string[]; // 工夫した点や特徴
}

// プロジェクトデータの配列
export const projects: Project[] = [
  {
    id: "project1",
    title: "オリジナルWebサイトA (仮称)",
    description: "ユーザーが簡単に情報を投稿・閲覧できる、シンプルな掲示板形式のウェブアプリケーションです。リアルタイム性を重視し、直感的な操作感を目指しました。",
    image: "/images/project-a-thumbnail.png", // 仮の画像パス。実際にはあなたのプロジェクトのスクリーンショットを配置してください。
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Tailwind CSS"],
    githubLink: "https://github.com/kometoume/project-a-repo", // あなたのGitHubリポジトリのURLに置き換えてください
    demoLink: "https://project-a-demo.vercel.app", // デモサイトのURLに置き換えてください
    points: [
      "リアルタイム通知機能の実装",
      "レスポンシブデザイン対応",
      "API連携によるデータ取得と表示の最適化",
      "コンポーネント指向による再利用性の高いコード設計",
    ],
  },
  {
    id: "project2",
    title: "〇〇サービスLP (仮称)",
    description: "架空のサービス「〇〇」のランディングページです。ターゲットユーザーにサービスの魅力を最大限に伝えるためのデザインと、コンバージョンを意識したUI/UXを設計しました。",
    image: "/images/project-b-thumbnail.jpg", // 仮の画像パス
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    githubLink: "https://github.com/kometoume/project-b-repo", // あなたのGitHubリポジトリのURLに置き換えてください
    demoLink: "https://project-b-demo.vercel.app", // デモサイトのURLに置き換えてください
    points: [
      "Figmaからの正確なコーディング",
      "アニメーションによるユーザーエンゲージメント向上",
      "SEOを考慮したマークアップ",
      "アクセシビリティ対応",
    ],
  },
  // 必要に応じてプロジェクトを追
];