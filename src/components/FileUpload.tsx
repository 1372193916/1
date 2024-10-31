import React, { useRef, useState } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  currentImage?: string;
  onFileSelect: (dataUrl: string) => void;
  label: string;
  isQrCode?: boolean;
}

export function FileUpload({ currentImage, onFileSelect, label, isQrCode }: FileUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(currentImage);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateQrCode = (dataUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(false);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        // Check if image has sufficient contrast and patterns typical of QR codes
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let blackPixels = 0;
        let whitePixels = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r + g + b) / 3;

          if (brightness < 128) blackPixels++;
          else whitePixels++;
        }

        // QR codes typically have a good balance of black and white pixels
        const ratio = blackPixels / (blackPixels + whitePixels);
        resolve(ratio > 0.2 && ratio < 0.8);
      };
      img.src = dataUrl;
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('文件大小不能超过5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        
        if (isQrCode) {
          const isValidQr = await validateQrCode(dataUrl);
          if (!isValidQr) {
            setError('请上传有效的二维码图片');
            return;
          }
        }

        setPreview(dataUrl);
        onFileSelect(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    setError('');
    onFileSelect('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-sm text-gray-500 mt-2">点击上传</span>
            {isQrCode && (
              <span className="text-xs text-gray-400 mt-1">仅支持二维码图片</span>
            )}
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      {error && (
        <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}