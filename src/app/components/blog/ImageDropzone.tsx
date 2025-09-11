'use client';

interface ImageDropzoneProps {
  onUpload: (url: string) => void;
}

export default function ImageDropzone({ onUpload }: ImageDropzoneProps) {
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Simular subida
    const url = URL.createObjectURL(file);
    onUpload(url);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFile} />
    </div>
  );
}
