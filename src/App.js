// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AddTask from './add';
import DeleteTask from './delete';
import FindTaskPage from './find';
import EditTaskPage from './edit';
import TaskTable from './TaskTable';

import { db, auth, provider } from './firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  // 認証状態の監視
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribeAuth();
  }, []);

  // タスクのリアルタイム取得（ログインユーザーのみ）
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    const unsubscribeTasks = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    });

    return () => unsubscribeTasks();
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      alert('ログインに失敗しました: ' + e.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      alert('ログアウトに失敗しました: ' + e.message);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('本当に削除しますか？')) return;
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (e) {
      alert('削除に失敗しました: ' + e.message);
    }
  };

  const handleComplete = async (id) => {
    try {
      await updateDoc(doc(db, 'tasks', id), { completed: true });
    } catch (e) {
      alert('完了更新に失敗しました: ' + e.message);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 text-lg">
        <Navigation />
        <div className="p-6 flex justify-end bg-gray-100 text-xl text-gray-700 font-semibold shadow">
          {user ? (
            <>
              <span className="mr-6">こんにちは、{user.displayName} さん</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
              >
                ログアウト
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow"
            >
              Googleでログイン
            </button>
          )}
        </div>

        <main className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-6 mt-6">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <TaskTable tasks={tasks} onComplete={handleComplete} />
                ) : (
                  <p className="text-center mt-8 text-gray-600">ログインしてください</p>
                )
              }
            />
            <Route
              path="/add"
              element={
                user ? (
                  <>
                    <AddTask user={user} />
                    <TaskTable tasks={tasks} onComplete={handleComplete} />
                  </>
                ) : (
                  <p className="text-center mt-8 text-gray-600">ログインしてください</p>
                )
              }
            />
            <Route
              path="/delete"
              element={
                user ? (
                  <DeleteTask tasks={tasks} onDelete={deleteTask} />
                ) : (
                  <p className="text-center mt-8 text-gray-600">ログインしてください</p>
                )
              }
            />
            <Route
              path="/find"
              element={
                user ? (
                  <>
                    <FindTaskPage />
                    <TaskTable tasks={tasks} onComplete={handleComplete} />
                  </>
                ) : (
                  <p className="text-center mt-8 text-gray-600">ログインしてください</p>
                )
              }
            />
            <Route
              path="/edit/:id"
              element={
                user ? (
                  <EditTaskPage />
                ) : (
                  <p className="text-center mt-8 text-gray-600">ログインしてください</p>
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
