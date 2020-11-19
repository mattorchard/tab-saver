export const downloadUrl = (url: string, name: string) => {
  const anchor = document.createElement("a");
  anchor.setAttribute("href", url);
  anchor.setAttribute("download", name);
  anchor.setAttribute("hidden", "true");
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
};

export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  try {
    downloadUrl(url, name);
  } finally {
    URL.revokeObjectURL(url);
  }
};

export const readBlob = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read blob"));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsText(blob);
  });

export const showFilePicker = (
  { accept, multiple }: { accept: string; multiple: boolean },
  onUpload: (files: File[]) => void
) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("hidden", "true");
  input.setAttribute("accept", accept);
  input.setAttribute("multiple", multiple.toString());
  input.onchange = () => {
    input.onchange = null;
    const files = [...input.files];
    onUpload(files);
  };
  document.body.appendChild(input);
  input.click();
  input.remove();
};
