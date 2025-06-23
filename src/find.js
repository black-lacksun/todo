import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';  // ← default import ではなく名前付きインポートに修正

function FindTaskPage() {
  const [tasks, setTasks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksCol = collection(db, 'tasks');
      const taskSnapshot = await getDocs(tasksCol);
      const taskList = taskSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskList);
      setFilteredTasks(taskList);
    };

    fetchTasks();
  }, []);

  const handleSearch = (e) => {
    const kw = e.target.value;
    setKeyword(kw);

    const filtered = tasks.filter(task =>
      task.name?.toLowerCase().includes(kw.toLowerCase()) ||
      task.note?.toLowerCase().includes(kw.toLowerCase()) ||
      task.date?.toLowerCase().includes(kw.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4 text-blue-500 text-center">タスク検索ページ</h2>

      <input
        type="text"
        placeholder="タスク名・メモ・日付で検索"
        value={keyword}
        onChange={handleSearch}
        className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">該当するタスクが見つかりません</p>
      ) : (
        <ul className="list-none">
          {filteredTasks.map(task => (
            <li key={task.id} className="p-4 border-b border-gray-300 bg-white rounded shadow-sm mb-2">
              <span className="font-medium text-lg">{task.name}</span>
              <div className="text-sm text-gray-600">
                {task.date} ／ {task.completed ? '完了' : '未完了'}
              </div>
              <p className="text-gray-800 mt-1">{task.note}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FindTaskPage;
