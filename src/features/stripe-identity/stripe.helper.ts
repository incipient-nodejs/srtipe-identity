export function getExtensionFromMimeType(mimeType: string): string {
  const mimeMap: { [key: string]: string } = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "application/pdf": "pdf",
    "image/gif": "gif",
    "application/zip": "zip",
    "application/vnd.ms-excel": "xls",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
  };

  return mimeMap[mimeType] || "bin";
}

export const downloadAndStoreFile = async (
  url: string,
  fileName: string,
  extension = "jpg"
) => {
  try {
    const response = await fetch(url); 
    const arrayBuffer = await response.arrayBuffer();

    //### Convert the array buffer to base64
    const base64Data = Buffer.from(arrayBuffer).toString("base64");

    //### Return file data as a buffer and base64-encoded string
    return { arrayBuffer, base64Data, extension };
  } catch (error) {
    console.error("Error downloading and storing file:", error);
    throw error; // Rethrow error for better error handling
  }
};
