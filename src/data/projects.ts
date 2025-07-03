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
    id: 'project1',
    title: 'クライアントのWebサイト',
    description:
      'クライアントのWebサイトです。クライアントの要望に応えつつ、サイトの顔となるスライダーのデザインや、ユーザー体験を向上させる見積もりシミュレーションの設計・実装を担当しました。',
    image: '/images/project-a-thumbnail.png', // 仮の画像パス。実際にはあなたのプロジェクトのスクリーンショットを配置してください。
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Adobe Photoshop', 'Adobe Illustrator'],
    demoLink: 'https://www.scsk.jp/sp/nvidia/index.html', // デモサイトのURLに置き換えてください
    points: [
      'レスポンシブデザイン対応',
      '見積もりシミュレーションの作成',
      'スライダー導入',
      'ポップアップバナー導入',
      '図版作成',
    ],
  },
  {
    id: 'project2',
    title: 'クライアントのWebサイト',
    description:
      'クライアントのWebサイトにおいて、トップページの印象を左右するスライダーのデザインから画像制作、実装・導入までを一貫して担当しました。また、既存サイトの構成やデザインの調整にも対応し、ユーザー動線の見直しや導線設計の改善を行いました。',
    image: '/images/project-b-thumbnail.png', // 仮の画像パス
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Adobe Photoshop', 'Adobe Illustrator'],
    demoLink: 'https://www.scsk.jp/sp/clubscsk/', // デモサイトのURLに置き換えてください
    points: [
      'レスポンシブデザイン対応',
      'スライダー導入',
      '図版作成',
    ],
  },
    {
    id: 'project3',
    title: 'クライアントのWebサイト',
    description:
      'クライアントのWebサイトにおいて、サイト全体のデザインを一新するリニューアルプロジェクトに携わり、画像制作、実装・導入までを一貫して担当しました。加えて、サイト全体の構成やデザインの見直しを行い、ユーザー動線を最適化しました。',
    image: '/images/project-c-thumbnail.png', // 仮の画像パス
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Adobe Photoshop', 'Adobe Illustrator'],
    demoLink: 'https://www.scsk.jp/sp/ixia/', // デモサイトのURLに置き換えてください
    points: [
      'レスポンシブデザイン対応',
      '図版作成',
    ],
  },
      {
    id: 'project4',
    title: 'クライアントのWebサイト',
    description:
      'クライアントの要望に応じて、サイト全体の構成やデザインの細部を適宜修正し、図版の作成や既存素材の調整なども行いました。視認性や操作性を意識した改善を重ねることで、ユーザー体験の向上に貢献しています。',
    image: '/images/project-d-thumbnail.png', // 仮の画像パス
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Adobe Photoshop', 'Adobe Illustrator'],
    demoLink: 'https://www.scsk.jp/sp/pureflow/index.html', // デモサイトのURLに置き換えてください
    points: [
      'レスポンシブデザイン対応',
      '図版作成',
    ],
  },
  {
  id: 'todo-app', // ユニークなIDを設定 (例: 'todo-app' など)
  title: 'Todoリストアプリケーション (自主制作)',
  description:
    'ReactとNext.js、Tailwind CSSで構築した、シンプルなTodo管理アプリケーションです。ブラウザのローカルストレージを利用し、データの永続化を実現しました。',
  image: '/images/todo-app-thumbnail.png', // このアプリのスクリーンショット画像パスに置き換えてください
  // 例: publicフォルダ内に画像を保存する場合 /images/todo-app-thumbnail.png
  technologies: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript'],
  demoLink: 'https://my-portfolio-michieyagis-projects.vercel.app/todos', // Vercelなどで公開したURLに置き換えてください
  points: [
    '自主制作**プロジェクト',
    'ローカルストレージを用いたデータ永続化',
    'Tailwind CSSによる効率的なスタイリング',
    'アクセシビリティ考慮（ポインター表示）', // 追加でアピールしたい点があれば
  ],
},
  // 必要に応じてプロジェクトを追加
];
