import React from 'react';
import { X, Share2, Copy } from 'lucide-react';

interface ShareModalProps {
  user: {
    name: string;
    title: string;
    description: string;
  };
  onClose: () => void;
}

export function ShareModal({ user, onClose }: ShareModalProps) {
  const shareUrl = window.location.href;
  
  const platforms = [
    {
      name: '小红书',
      icon: '📱',
      shareText: `${user.name} - ${user.title}\n${user.description}\n\n查看详情：${shareUrl}`,
      action: function() {
        navigator.clipboard.writeText(this.shareText);
        alert('内容已复制，请粘贴到小红书分享');
      }
    },
    {
      name: '抖音',
      icon: '🎵',
      shareText: `${user.name} - ${user.title}\n${user.description}\n\n查看详情：${shareUrl}`,
      action: function() {
        navigator.clipboard.writeText(this.shareText);
        alert('内容已复制，请粘贴到抖音分享');
      }
    },
    {
      name: '微信',
      icon: '💬',
      shareText: `${user.name} - ${user.title}\n${user.description}\n\n查看详情：${shareUrl}`,
      action: function() {
        navigator.clipboard.writeText(this.shareText);
        alert('内容已复制，请粘贴到微信分享');
      }
    },
    {
      name: '微博',
      icon: '🌐',
      shareText: `${user.name} - ${user.title}\n${user.description}\n\n查看详情：${shareUrl}`,
      action: function() {
        navigator.clipboard.writeText(this.shareText);
        alert('内容已复制，请粘贴到微博分享');
      }
    }
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('链接已复制到剪贴板');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">分享到</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {platforms.map((platform) => (
            <button
              key={platform.name}
              onClick={() => platform.action()}
              className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <span className="text-2xl">{platform.icon}</span>
              <span className="text-sm text-gray-600">{platform.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 bg-transparent text-sm text-gray-600"
          />
          <button
            onClick={copyLink}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <Copy className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}