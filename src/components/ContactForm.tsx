// src/components/ContactForm.tsx
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formMessage, setFormMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで送信処理を実装（例: API呼び出しやメール送信サービス連携）
    // 現時点では表示のみ
    setFormMessage('送信ありがとうございました！');
    (e.target as HTMLFormElement).reset(); // フォームをリセット
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">お問い合わせ</h2>
      <form id="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mt-4 font-bold text-sm">名前:</label>
        <input type="text" id="name" name="name" required className="w-full p-2 mt-1 border rounded" />

        <label htmlFor="email" className="block mt-4 font-bold text-sm">メール:</label>
        <input type="email" id="email" name="email" required className="w-full p-2 mt-1 border rounded" />

        <label htmlFor="message" className="block mt-4 font-bold text-sm">メッセージ:</label>
        <textarea id="message" name="message" rows={4} required className="w-full p-2 mt-1 border rounded"></textarea>

        <button type="submit" className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          送信
        </button>
      </form>
      {formMessage && <p className="mt-4 text-green-600 font-bold">{formMessage}</p>}
    </div>
  );
}