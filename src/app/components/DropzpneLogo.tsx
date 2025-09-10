import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

export default function DropzoneLogo({ onFile }: { onFile: (fileUrl: string) => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadToS3 = async (file: File) => {
    setIsUploading(true);
    // Aquí deberías obtener la URL de subida y credenciales desde tu backend
    // Ejemplo: const { uploadUrl, fileUrl } = await fetch('/api/upload-logo').then(r => r.json());
    // Por simplicidad, aquí solo simulo la subida
    // Reemplaza esto por tu lógica real de subida a S3
    await new Promise((res) => setTimeout(res, 1500));
    const fileUrl = URL.createObjectURL(file); // Simulación, reemplaza por la URL real de S3
    setPreview(fileUrl);
    onFile(fileUrl);
    setIsUploading(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadToS3(acceptedFiles[0]);
    }
  }, []);

  const removeImage = () => {
    setPreview(null);
    onFile('');
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-slate-50 dark:bg-slate-800"
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          )}
          <p className="text-sm font-medium text-gray-900">
            {isUploading
              ? 'Subiendo...'
              : isDragActive
                ? 'Suelta el logo aquí...'
                : 'Haz clic o arrastra tu logo aquí'}
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB</p>
        </div>
      ) : (
        <div className="relative w-32 h-32 mx-auto">
          <Image src={preview} alt="Logo" fill className="object-contain rounded-lg" />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            title="Eliminar logo"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
