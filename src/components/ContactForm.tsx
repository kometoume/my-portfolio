// src/components/ContactForm.tsx
'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // 送信中かどうかの状態を追加
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // 送信成功/失敗の状態を追加

  // ★追加：カスタムバリデーションメッセージを設定する関数
  const setCustomValidity = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, message: string) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    target.setCustomValidity(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォームのデフォルト送信を防ぐ

    // バリデーションチェック (setCustomValidity がここで発火します)
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) {
      // バリデーションエラーがあれば、送信処理を中断
      return;
    }

    setIsSubmitting(true); // 送信中状態を開始
    setFormMessage(''); // 以前のメッセージをクリア
    setIsSuccess(null); // 状態をリセット

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // フォームデータをJSON形式で送信
      });

      if (response.ok) {
        setFormMessage('お問い合わせありがとうございました！');
        setIsSuccess(true);
        form.reset(); // フォームの内容をクリア
      } else {
        const errorData = await response.json();
        setFormMessage(`送信に失敗しました: ${errorData.message || '不明なエラー'}`);
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('フォーム送信エラー:', error);
      setFormMessage('お問い合わせの送信中にエラーが発生しました。しばらくしてから再度お試しください。');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false); // 送信状態を解除
    }
  };

  return (
    // ★修正：最上位の div に text-gray-900 を適用。これにより中のほとんどのテキストが黒くなります。
    // その下の余分な div は削除しました。
    <div className="text-gray-900">
      {/* ★修正：「お問い合わせ」タイトルに text-gray-900 を明示的に追加し、確実にする */}
      <h2 className="text-2xl font-bold mb-4 text-gray-900">お問い合わせ</h2>
      <form id="contactForm" onSubmit={handleSubmit}>
        {/* ★修正：ラベルにも text-gray-900 を明示的に追加し、確実にする */}
        <label htmlFor="name" className="block mt-4 font-bold text-sm text-gray-900">名前:</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full p-2 mt-1 border rounded text-gray-900"
          onInvalid={(e) => setCustomValidity(e, 'お名前を入力してください。')} // ★追加
          onInput={(e) => setCustomValidity(e, '')} // ★追加
        />

        {/* ★修正：ラベルにも text-gray-900 を明示的に追加し、確実にする */}
        <label htmlFor="email" className="block mt-4 font-bold text-sm text-gray-900">メール:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full p-2 mt-1 border rounded text-gray-900"
          onInvalid={(e) => setCustomValidity(e, '有効なメールアドレスを入力してください。')} // ★追加
          onInput={(e) => setCustomValidity(e, '')} // ★追加
        />

        {/* ★修正：ラベルにも text-gray-900 を明示的に追加し、確実にする */}
        <label htmlFor="message" className="block mt-4 font-bold text-sm text-gray-900">メッセージ:</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full p-2 mt-1 border rounded text-gray-900"
          onInvalid={(e) => setCustomValidity(e, 'メッセージを入力してください。')} // ★追加
          onInput={(e) => setCustomValidity(e, '')} // ★追加
        ></textarea>

        <button
          type="submit"
          className={`mt-6 py-2 px-4 rounded transition-colors ${
            isSubmitting // 送信中かどうかに応じてスタイルを変更
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
          } text-white`}
          disabled={isSubmitting} // 送信中はボタンを無効化
        >
          {isSubmitting ? '送信中...' : '送信'} {/* ボタンのテキストも変更 */}
        </button>
      </form>
      {/* ★修正：成功/失敗メッセージの p タグには、親の text-gray-900 ではなく、成功/失敗の色を優先 */}
      {formMessage && (
        <p className={`mt-4 font-bold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {formMessage}
        </p>
      )}
    </div>
  );
}