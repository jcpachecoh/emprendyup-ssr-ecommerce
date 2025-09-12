export default function useImageUpload() {
  // Placeholder: replace with real upload logic to S3 or your storage provider
  async function uploadImage(file: File): Promise<{ url: string } | null> {
    // Simple fake upload that returns a blob URL after a small delay
    await new Promise((r) => setTimeout(r, 700));
    const url = URL.createObjectURL(file);
    return { url };
  }

  return { uploadImage };
}
