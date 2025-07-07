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
    title: '勤務先のWebサイト',
    description:
      '勤務先のWebサイトの制作・改修を担当しました。主にHTML, CSS, JavaScript, jQueryを用いてレスポンシブデザインに対応させ、視覚的な魅力を高めるスライダーを導入しました。バックエンドではPHPを使用してセキュアな問い合わせフォームを実装しています。デザイン面ではAdobe PhotoshopとIllustratorを活用し、サイト全体の品質向上に貢献しました。',
    image: '/images/eding-thumbnail.png', // 仮の画像パス。実際にはあなたのプロジェクトのスクリーンショットを配置してください。
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery','PHP', 'Adobe Photoshop', 'Adobe Illustrator'],
    demoLink: 'https://www.eding.co.jp', // デモサイトのURLに置き換えてください
    points: [
      'レスポンシブデザイン対応',
      '問い合わせフォーム作成',
      'スライダー導入',
    ],
  },
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
  title: '筋トレ習慣化Todoリストアプリ（自主制作）',
  description:
    '筋トレ初心者でも習慣化しやすいように設計されたTodo管理アプリです。ReactとNext.jsで構築し、最低限必要なトレーニング3種目を毎回初期表示。完了後に再表示される仕組みによって継続をサポートします。ブラウザのローカルストレージを使用し、データを永続化しています。',
  image: '/images/todo-app-thumbnail.png', // このアプリのスクリーンショット画像パスに置き換えてください
  // 例: publicフォルダ内に画像を保存する場合 /images/todo-app-thumbnail.png
  technologies: ['React', 'Next.js', 'TypeScript', 'HTML', 'Tailwind CSS', 'LocalStorage'],
  demoLink: 'https://my-portfolio-michieyagis-projects.vercel.app/todos', // Vercelなどで公開したURLに置き換えてください
  points: [
    '筋トレ継続を支援するため、全身に効く3種目（スクワット・ベンチプレス・ラットプルダウン）を自動で再表示',
    'ユーザーが自由に補助種目を追加・完了・削除可能な柔軟な設計',
    'ローカルストレージによるトレーニングデータの永続保存',
    'Tailwind CSSを使ったシンプルかつ直感的なUIで、モバイルからの使用も想定',
  ],
},
{
  id: 'calendar-app', // ユニークなIDを設定 (例: 'calendar-app' など)
  title: 'インタラクティブカレンダー (自主制作)',
  description:
    'Reactを使ったシンプルなカレンダーコンポーネントです。日付の表示、月の移動、今日の表示、そして各日付ごとのトレーニング記録の管理とモーダル表示の機能を持っています。',
  image: '/images/calendar-app-thumbnail.png', // あなたのカレンダーアプリのスクリーンショット画像パスに置き換えてください
  technologies: ['React', 'Next.js', 'TypeScript', 'HTML', 'Tailwind CSS', 'LocalStorage'],
  demoLink: 'https://my-portfolio-michieyagis-projects.vercel.app/calendar', // あなたのポートフォリオサイト内のカレンダーアプリのURLに置き換えてください
  points: [
    '時刻の自動更新',
    'ローカルストレージによるトレーニングデータの永続保存',
    '日付計算ロジックの実装',
    '今日の日付のハイライト処理',
    'イベントハンドリングとユーザーインタラクション',
  ],
},
  // 必要に応じてプロジェクトを追加
];
