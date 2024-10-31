import React, { useState } from 'react';
import { QrCode, MessageCircle, Share2, UserPlus, Trash2, Edit } from 'lucide-react';
import { ShareModal } from './ShareModal';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    title: string;
    description: string;
    avatar: string;
    qrCode: string;
  };
  isAdmin: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function UserCard({ user, isAdmin, onEdit, onDelete }: UserCardProps) {
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-green-400 to-green-500">
        {isAdmin && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => onEdit(user.id)}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Edit className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => onDelete(user.id)}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Trash2 className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
        <div className="absolute -bottom-12 left-6">
          <img
            src={user.avatar}
            alt="头像"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="pt-16 px-6 pb-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-green-600 font-medium">{user.title}</p>
        </div>

        <p className="text-gray-600 mb-6">{user.description}</p>

        <div className="bg-gray-50 p-4 rounded-xl mb-6 flex items-center gap-4">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <img src={user.qrCode} alt="二维码" className="w-16 h-16" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">扫码添加</h2>
            <p className="text-sm text-gray-600">使用微信扫描二维码</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
            <UserPlus className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">添加</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
            <MessageCircle className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">消息</span>
          </button>
          <button 
            onClick={() => setShowShareModal(true)}
            className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
          >
            <Share2 className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">分享</span>
          </button>
        </div>
      </div>

      {showShareModal && (
        <ShareModal
          user={user}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}