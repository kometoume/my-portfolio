// src/components/TodoApp.tsx

'use client';

import React, { useState, useEffect, FormEvent } from 'react';

interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error("localStorageからのTodoのパースに失敗しました:", error);
        setTodos([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      title: inputValue.trim(),
      isCompleted: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    if (!confirm('本当にこのタスクを削除しますか？')) {
      return;
    }
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const purgeCompletedTodos = () => {
    if (!confirm('完了済みのタスクをすべて削除しますか？')) {
      return;
    }
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.isCompleted));
  };

  return (
    <div className="container mx-auto p-6 max-w-md bg-white rounded-xl shadow-lg mt-8">
      <h1 className="text-3xl font-extrabold border-b-2 border-gray-200 pb-3 mb-6 flex justify-between items-center text-gray-800">
        タスク一覧
        <button
          onClick={purgeCompletedTodos}
          className="ml-4 px-4 py-2 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-opacity-50 text-base font-semibold cursor-pointer"
        >
          完了済みを削除
        </button>
      </h1>

      <ul id="todos" className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <label className="flex items-center flex-grow cursor-pointer text-gray-700">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => toggleTodo(todo.id)}
                // focus:ring-blue-800 と focus:ring-2 を削除
                className="mr-4 w-6 h-6 bg-gray-200 border-gray-300 rounded cursor-pointer
                           checked:bg-blue-900 checked:border-transparent focus:outline-none" // focus:outline-none を追加してデフォルトのアウトラインも消す
              />
              <span className={`text-lg flex-grow ${todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {todo.title}
              </span>
            </label>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-4 w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 hover:text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={addTodo} className="flex gap-3 mt-8">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="新しいタスクを入力してください..."
          className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent text-gray-700 text-base"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50 text-base font-semibold cursor-pointer"
        >
          追加
        </button>
      </form>
    </div>
  );
};

export default TodoApp;