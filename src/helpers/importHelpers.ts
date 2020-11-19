import { readBlob } from "./fileHelpers";
import { fromCsv } from "./csvHelpers";
import Tab = chrome.tabs.Tab;

const hasHeader = (rows: string[][]) => {
  const headerRow = rows[0];
  const linkCell = headerRow[1];
  try {
    new URL(linkCell);
    return false;
  } catch {
    return true;
  }
};

const defaultTabProps = {
  pinned: false,
  highlighted: false,
  windowId: -1,
  active: false,
  selected: false,
  discarded: false,
  incognito: false,
  autoDiscardable: true
};

export const importTabs = async (file: File): Promise<Tab[]> => {
  const fileContent = await readBlob(file);
  const rows = fromCsv(fileContent);
  if (rows.length === 0) {
    throw new Error(`No rows in CSV?`);
  }
  if (hasHeader(rows)) {
    rows.shift();
  }
  return rows.map(
    ([title, url], index): Tab => ({
      title,
      url,
      index,
      ...defaultTabProps
    })
  );
};
