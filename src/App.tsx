import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { UserCard } from './components/UserCard';
import { UserForm } from './components/UserForm';
import { LoginPage } from './components/LoginPage';

interface User {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  qrCode: string;
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>();
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: '张工程师',
      title: '全栈开发工程师',
      description: '专注于React与Node.js开发，让我们一起创造精彩的web体验！',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80',
      qrCode: 'https://images.unsplash.com/photo-1635870723802-e88d76ae324e?auto=format&fit=crop&w=300&q=80',
    }
  ]);

  const handleLogin = (success: boolean) => {
    setIsAdmin(success);
  };

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers([...users, newUser]);
    setShowForm(false);
  };

  const handleEditUser = (userData: User) => {
    setUsers(users.map(user => user.id === userData.id ? userData : user));
    setEditingUser(undefined);
    setShowForm(false);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  if (!isAdmin) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">用户名片管理</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            添加用户
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
              isAdmin={isAdmin}
              onEdit={(id) => {
                setEditingUser(users.find(u => u.id === id));
                setShowForm(true);
              }}
              onDelete={handleDeleteUser}
            />
          ))}
        </div>

        {showForm && (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleEditUser : handleAddUser}
            onClose={() => {
              setShowForm(false);
              setEditingUser(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;