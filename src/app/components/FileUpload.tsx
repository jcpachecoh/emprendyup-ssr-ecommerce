import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

type FileUploadProps = {
  onFile: (file: string) => void;
  accept?: string;
};

export default function FileUpload({ onFile, accept = 'image/*' }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // simulate upload latency for client preview
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const fileUrl = URL.createObjectURL(file);
      setPreview(fileUrl);
      onFile(fileUrl);
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-2">
      {!preview ? (
        <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
          <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
          {isUploading ? (
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          ) : (
            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
          )}
          <p className="text-sm text-gray-600">
            {isUploading ? 'Subiendo...' : 'Haz clic para subir archivo'}
          </p>
        </label>
      ) : (
        <div className="relative inline-block">
          <Image
            src={preview}
            alt="Preview"
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-lg"
            unoptimized
          />
          <button
            onClick={() => {
              setPreview(null);
              onFile('');
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
