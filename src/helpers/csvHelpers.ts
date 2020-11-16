const prefix = "data:text/csv;charset=utf-8,";

const escapeCommas = (text: string) => {
  if (/,/.test(text)) {
    // Wrap with double quotes and replace any pre-existing doubles with singles
    return `"${text.replace(/"/g, "'")}"`;
  } else {
    // No-commas leave as is
    return text;
  }
};

export const toCsv = (rows: any[][]) =>
  `${rows
    .map(row => row.map(cell => escapeCommas(cell.toString())).join(","))
    .join("\r\n")}`;
