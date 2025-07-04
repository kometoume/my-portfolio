'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
  sets: number;
  reps: number;
  weight: number;
  dateCompleted?: number;
  notes?: string;
}

const initialTodos: Todo[] = [
  { id: 1, title: 'スクワット', isCompleted: false, sets: 3, reps: 12, weight: 30 },
  { id: 2, title: 'ベンチプレス', isCompleted: false, sets: 3, reps: 12, weight: 30 },
  { id: 3, title: 'ラットプル', isCompleted: false, sets: 3, reps: 12, weight: 30 },
];

const TodoApp: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [inputValue, setInputValue] = useState<{
    title: string;
    sets: number;
    reps: number;
    weight: number;
  }>({
    title: '',
    sets: 1,
    reps: 1,
    weight: 0,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        try {
          setTodos(JSON.parse(savedTodos));
        } catch (error) {
          console.error("localStorageからのTodoのパースに失敗しました:", error);
          setTodos(initialTodos);
        }
      } else {
        // Local Storageが空の場合もinitialTodosを設定
        setTodos(initialTodos);
      }
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== 'undefined') {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isClient]);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.title.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      title: inputValue.title.trim(),
      isCompleted: false,
      sets: inputValue.sets,
      reps: inputValue.reps,
      weight: inputValue.weight,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputValue({
      title: '',
      sets: 1,
      reps: 1,
      weight: 0,
    });
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
              dateCompleted: !todo.isCompleted ? Date.now() : undefined,
            }
          : todo
      )
    );
  };

  const handleEditTodo = (id: number, field: 'sets' | 'reps' | 'weight', value: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, [field]: value }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    if (!confirm('本当にこのタスクを削除しますか？')) {
      return;
    }
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    // 全てのタスクが削除された場合、initialTodosを再表示
    if (updatedTodos.length === 0) {
      setTodos(initialTodos);
    } else {
      setTodos(updatedTodos);
    }
  };

  const purgeCompletedTodos = () => {
    if (!confirm('完了済みのタスクをすべて削除しますか？')) {
      return;
    }
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    // 完了済みを削除した結果、リストが空になった場合、initialTodosを再表示
    if (newTodos.length === 0) {
      setTodos(initialTodos);
    } else {
      setTodos(newTodos);
    }
  };

  if (!isClient) {
    return (
      <div className="container mx-auto p-6 max-w-xl bg-white rounded-xl shadow-lg mt-5 text-center text-gray-600">
        読み込み中...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-xl bg-white rounded-xl shadow-2xl mt-5 border border-blue-100">
      <h1 className="text-2xl font-extrabold text-blue-800 mb-6 pb-4 border-b-4 border-blue-200 flex justify-between items-center">
        現在のトレーニングメニュー
        <button
          onClick={purgeCompletedTodos}
          className="ml-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 text-base font-semibold cursor-pointer shadow-md"
        >
          完了済みを削除
        </button>
      </h1>

      <ul id="todos" className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-4 rounded-lg shadow-md transition-all duration-200 ease-in-out
                       ${todo.isCompleted ? 'bg-green-100 border-green-200' : 'bg-blue-50 border-blue-200 hover:shadow-lg'}`}
          >
            <label className="flex items-center flex-grow cursor-pointer text-gray-700">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleTodo(todo.id)}
                className="mr-4 w-6 h-6 bg-gray-200 border-gray-300 rounded cursor-pointer
                           checked:bg-blue-900 checked:border-transparent focus:outline-none flex-shrink-0"
              />
              <div className={`text-lg flex-grow ${todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                <span className="font-bold block mb-2">{todo.title}</span>
                <div className="flex items-center text-sm text-gray-600 mt-1 space-x-2 flex-wrap">
                  {/* kg入力フィールド */}
                  <input
                    type="number"
                    value={todo.weight}
                    onChange={(e) => handleEditTodo(todo.id, 'weight', parseFloat(e.target.value) || 0)}
                    className="w-20 p-1 border border-blue-300 rounded text-center bg-white focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                    step="0.5"
                  />
                  <span className="font-medium">kg</span>
                  {/* 回数入力フィールド */}
                  <input
                    type="number"
                    value={todo.reps}
                    onChange={(e) => handleEditTodo(todo.id, 'reps', parseInt(e.target.value) || 0)}
                    className="w-16 p-1 border border-blue-300 rounded text-center bg-white focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                  <span className="font-medium">回</span>
                  {/* セット数入力フィールド */}
                  <input
                    type="number"
                    value={todo.sets}
                    onChange={(e) => handleEditTodo(todo.id, 'sets', parseInt(e.target.value) || 0)}
                    className="w-16 p-1 border border-blue-300 rounded text-center bg-white focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                  <span className="font-medium">セット</span>
                </div>
                {todo.isCompleted && todo.dateCompleted && (
                  <div className="text-xs text-gray-400 mt-1">
                    完了日: {new Date(todo.dateCompleted).toLocaleDateString('ja-JP')}
                  </div>
                )}
              </div>
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-4 w-9 h-9 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 hover:text-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {/* 新しいToDoを追加するセクション */}
      <div className="mt-10 pt-6 border-t-4 border-dashed border-blue-300">
        <h2 className="text-2xl font-bold mb-5 text-blue-700">新しいトレーニングを追加</h2>
        <form onSubmit={addTodo} className="flex flex-col gap-4 p-5 bg-blue-100 rounded-lg shadow-inner">
          {/* 種目名入力フィールド */}
          <input
            type="text"
            value={inputValue.title}
            onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
            placeholder="種目名を入力してください (例: 新しいスクワット)"
            className="flex-grow p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700 text-base bg-white shadow-sm"
          />
          {/* kg、回数、セットの入力フィールドを新しい順序で配置 */}
          <div className="flex gap-3">
            {/* 重さ入力フィールド (kg) */}
            <div className="flex flex-col flex-1">
              <label htmlFor="new-weight" className="text-sm font-semibold text-blue-800 mb-1">kg</label>
              <input
                id="new-weight"
                type="number"
                value={inputValue.weight}
                onChange={(e) => setInputValue({ ...inputValue, weight: parseFloat(e.target.value) || 0 })}
                placeholder="0"
                min="0"
                step="0.5"
                className="p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700 text-base bg-white shadow-sm w-full"
              />
            </div>
            {/* 回数入力フィールド */}
            <div className="flex flex-col flex-1">
              <label htmlFor="new-reps" className="text-sm font-semibold text-blue-800 mb-1">回数</label>
              <input
                id="new-reps"
                type="number"
                value={inputValue.reps}
                onChange={(e) => setInputValue({ ...inputValue, reps: parseInt(e.target.value) || 1 })}
                placeholder="1"
                min="1"
                className="p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700 text-base bg-white shadow-sm w-full"
              />
            </div>
            {/* セット数入力フィールド */}
            <div className="flex flex-col flex-1">
              <label htmlFor="new-sets" className="text-sm font-semibold text-blue-800 mb-1">セット</label>
              <input
                id="new-sets"
                type="number"
                value={inputValue.sets}
                onChange={(e) => setInputValue({ ...inputValue, sets: parseInt(e.target.value) || 1 })}
                placeholder="1"
                min="1"
                className="p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-gray-700 text-base bg-white shadow-sm w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 text-base font-semibold cursor-pointer shadow-lg"
          >
            新しいトレーニングを追加
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoApp;