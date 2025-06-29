// src/components/ContactForm.tsx
'use client'; // ★この行がファイルの先頭にあることを確認してください！

import { useState } from 'react';

export default function ContactForm() {
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // 送信中かどうかの状態を追加
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // 送信成功/失敗の状態を追加

  const handleSubmit = async (e: React.FormEvent) => { // ★asyncキーワードを追加
    e.preventDefault(); // フォームのデフォルト送信を防ぐ
    setIsSubmitting(true); // 送信中状態を開始
    setFormMessage(''); // 以前のメッセージをクリア
    setIsSuccess(null); // 状態をリセット

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      // ★★★ ここがAPI Routeを呼び出す重要な部分です！ ★★★
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // フォームデータをJSON形式で送信
      });

      if (response.ok) {
        // HTTPステータスが200番台の場合（成功）
        setFormMessage('お問い合わせありがとうございました！');
        setIsSuccess(true);
        form.reset(); // フォームの内容をクリア
      } else {
        // HTTPステータスが200番台以外の場合（例: 400, 500など、API側でエラーがあった場合）
        const errorData = await response.json();
        setFormMessage(`送信に失敗しました: ${errorData.message || '不明なエラー'}`);
        setIsSuccess(false);
      }
    } catch (error) {
      // ネットワークエラーなど、fetch自体が失敗した場合
      console.error('フォーム送信エラー:', error);
      setFormMessage('お問い合わせの送信中にエラーが発生しました。しばらくしてから再度お試しください。');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false); // 送信状態を解除
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">お問い合わせ</h2>
      <form id="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mt-4 font-bold text-sm">名前:</label>
        <input type="text" id="name" name="name" required className="w-full p-2 mt-1 border rounded text-gray-900" />

        <label htmlFor="email" className="block mt-4 font-bold text-sm">メール:</label>
        <input type="email" id="email" name="email" required className="w-full p-2 mt-1 border rounded text-gray-900" />

        <label htmlFor="message" className="block mt-4 font-bold text-sm">メッセージ:</label>
        <textarea id="message" name="message" rows={4} required className="w-full p-2 mt-1 border rounded text-gray-900"></textarea>

        <button
          type="submit"
          className={`mt-6 py-2 px-4 rounded transition-colors ${
            isSubmitting // 送信中かどうかに応じてスタイルを変更
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
          disabled={isSubmitting} // 送信中はボタンを無効化
        >
          {isSubmitting ? '送信中...' : '送信'} {/* ボタンのテキストも変更 */}
        </button>
      </form>
      {formMessage && (
        <p className={`mt-4 font-bold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {formMessage}
        </p>
      )}
    </div>
  );
}