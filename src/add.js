// add.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskNote, setTaskNote] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert('ログインしてください');
      return;
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        name: taskName,
        date: taskDate,
        note: taskNote,
        completed: false,
        userId: user.uid,
      });
      alert('タスクを追加しました！');
      navigate('/');
    } catch (error) {
      alert('追加に失敗しました: ' + error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-xl font-bold mb-4 text-center text-blue-500">タスク追加</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">タスク名：</label>
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">日付：</label>
            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">メモ：</label>
            <textarea
              value={taskNote}
              onChange={(e) => setTaskNote(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            追加する
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
