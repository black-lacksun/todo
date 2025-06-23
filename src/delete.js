import React from 'react';
// firebaseはdefault exportではなく名前付きexportなので、以下のimportは不要です
// import firebase from './firebase';
// const { db } = firebase;

function DeleteTask({ tasks, onDelete }) {
  return (
    <div className="min-h-screen bg-gray-100 text-center">
      <h2 className="text-xl font-bold mb-4 text-blue-500">タスク削除ページ</h2>
      <ul className="list-none max-w-2xl mx-auto">
        {tasks.length === 0 && <p>削除可能なタスクがありません</p>}
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center p-4 border-b bg-white"
          >
            <span>{task.name} - {task.date}</span>
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteTask;
