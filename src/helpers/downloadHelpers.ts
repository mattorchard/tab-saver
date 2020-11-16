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
