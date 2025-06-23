// components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FcManager, FcFullTrash, FcDataRecovery } from 'react-icons/fc';
import { FaSearchengin } from 'react-icons/fa6';

function Navigation() {
  return (
    <nav className="bg-gray-100 pt-6 text-center space-x-6">
  <Link to="/" className="inline-flex items-center space-x-1 hover:text-blue-600">
    <FcManager />
    <span>一覧</span>
  </Link>
      |
      <Link to="/add" className="inline-flex items-center space-x-1 hover:text-blue-600">
        <FcDataRecovery />
        <span>追加</span>
      </Link>
      |
      <Link to="/delete" className="inline-flex items-center space-x-1 hover:text-blue-600">
        <FcFullTrash />
        <span>削除</span>
      </Link>
      |
      <Link to="/find" className="inline-flex items-center space-x-1 hover:text-blue-600">
        <FaSearchengin />
        <span>検索</span>
      </Link>
    </nav>
  );
}

export default Navigation;
