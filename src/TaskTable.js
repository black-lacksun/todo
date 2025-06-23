// TaskTable.js
import React from 'react';
import { Link } from 'react-router-dom';

function TaskTable({ tasks, onComplete }) {
  const handleComplete = async (id) => {
    try {
      await onComplete(id);
    } catch (error) {
      alert('完了更新に失敗しました: ' + error.message);
    }
  };

  return (
    <div>
<h1 className="text-center p-6 text-3xl font-bold text-blue-600">
  タスク一覧
</h1>
<table className="border shadow-md rounded-2xl mx-auto w-full max-w-4xl text-base text-gray-800">
  <thead>
    <tr className="bg-blue-500 text-white text-lg">
      <th className="px-6 py-3 border">タスク名</th>
      <th className="px-6 py-3 border">日付</th>
      <th className="px-6 py-3 border">メモ</th>
      <th className="px-6 py-3 border">状態</th>
      <th className="px-6 py-3 border">編集</th>
      <th className="px-6 py-3 border">完了</th>
    </tr>
  </thead>
<tbody>
  {tasks.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center p-4 text-gray-500">
        タスクがありません
      </td>
    </tr>
  ) : (
    tasks.map((task) => (
      <tr key={task.id} className="odd:bg-white even:bg-gray-100">
        <td className="border px-6 py-3">{task.name}</td>
        <td className="border px-6 py-3">{task.date}</td>
        <td className="border px-6 py-3">{task.note}</td>
        <td className="border px-6 py-3">
          {task.completed ? (
            <span className="text-green-600 font-semibold">完了</span>
          ) : (
            <span className="text-red-600 font-semibold">未完了</span>
          )}
        </td>
        <td className="border px-6 py-3 text-center">
          <Link
            to={`/edit/${task.id}`}
            className="text-blue-600 hover:underline"
          >
            編集
          </Link>
        </td>
        <td className="border px-6 py-3 text-center">
          {!task.completed && (
            <button
              onClick={() => handleComplete(task.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              完了
            </button>
          )}
        </td>
      </tr>
    ))
  )}
</tbody>
</table>

    </div>
  );
}

export default TaskTable;
