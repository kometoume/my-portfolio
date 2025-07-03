// src/app/todos/page.tsx

import TodoApp from '../../components/TodoApp';

export default function TodosPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold text-gray-700 mb-5">Todoリスト</h1> {/* 日本語化 */}
      <TodoApp />
    </main>
  );
}