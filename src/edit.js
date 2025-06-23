import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';  // ← default import ではなく名前付きインポートに変更

function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    console.log("編集ページのid:", id);
    const fetchTask = async () => {
      try {
        const docRef = doc(db, 'tasks', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log('取得したタスク:', data);
          setTask(data);
          setName(data.name || '');
          setDate(data.date || '');
          setNote(data.note || '');
        } else {
          alert('タスクが見つかりませんでした');
          navigate('/');
        }
      } catch (error) {
        console.error('取得エラー:', error);
        alert('タスクを取得できませんでした');
        navigate('/');
      }
    };
    if (id) fetchTask();
  }, [id, navigate]);

  if (!id) return <p>URLにIDが指定されていません。</p>;

  if (!task) return <p className="text-center mt-10">読み込み中...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">タスクを編集</h2>

      <label className="block mb-2">
        タスク名:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        期日:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block mb-4">
        メモ:
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </label>

      <div className="flex justify-between">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
        >
          キャンセル
        </button>
        <button
          onClick={async () => {
            try {
              const docRef = doc(db, 'tasks', id);
              await updateDoc(docRef, { name, date, note });
              alert('タスクを更新しました');
              navigate('/');
            } catch (error) {
              console.error('更新エラー:', error);
              alert('タスクの更新に失敗しました');
            }
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          保存
        </button>
      </div>
    </div>
  );
}

export default EditTaskPage;
