import { TabCompilation } from "../hooks/useTabCompilations";
import { toCsv } from "./csvHelpers";
import { downloadBlob } from "./downloadHelpers";

const getFilename = (tabCompilation: TabCompilation) => {
  const savedAt = new Date(tabCompilation.savedAt);
  const isoDate = savedAt.toISOString().substring(10);
  return `${tabCompilation.tabs.length}-tabs-from-${isoDate}.csv`;
};

export const exportTabCompilation = (tabCompilation: TabCompilation) => {
  const rows: string[][] = tabCompilation.tabs.map(tab => [
    tab.title || "",
    tab.url || ""
  ]);
  rows.unshift(["Title", "Link"]);
  const csvText = toCsv(rows);
  const blob = new Blob(["\ufeff", csvText], { type: "text/csv" });
  downloadBlob(blob, getFilename(tabCompilation));
};