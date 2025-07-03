/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ここにカスタムカラーなどを追加
      colors: {
        'custom-blue': '#243c5a', // 例: カスタムカラーの追加
        'primary': '#4F46E5', // メインで使う色（例: ボタン、見出し）
        'secondary': '#8B5CF6', // 補足的な色
        'accent': '#EC4899',   // アクセントに使う色
        'background-light': '#F8FAFC', // 明るい背景色
        'background-dark': '#1E293B',  // 暗い背景色
        'text-dark': '#1F2937',     // 暗いテキスト色
        'text-light': '#F9FAFB',    // 明るいテキスト色
      },
      spacing: {
        '128': '32rem', // 例: カスタム間隔の追加
      },
    },
  },
  plugins: [],
};