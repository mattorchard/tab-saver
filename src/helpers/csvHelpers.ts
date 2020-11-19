const escapeCommas = (text: string) => {
  if (/,/.test(text)) {
    // Wrap with double quotes and replace any pre-existing doubles with singles
    return `"${text.replace(/"/g, "'")}"`;
  } else {
    // No-commas leave as is
    return text;
  }
};

const splitAtFirst = (text: string, search: string) => {
  const index = text.indexOf(search);
  if (index === -1) return [text, ""];
  return [text.substring(0, index), text.substring(index + 1)];
};

const splitIntoCells = (text: string) => {
  let cells: string[] = [];
  let buffer = text;
  while (buffer.length > 0) {
    if (buffer.charAt(0) === `"`) {
      const [cell, rest] = splitAtFirst(buffer.substring(1), `"`);
      cells.push(cell);
      buffer = rest.substring(1);
    } else {
      const [cell, rest] = splitAtFirst(buffer, ",");
      cells.push(cell);
      buffer = rest;
    }
  }
  return cells;
};

export const toCsv = (rows: any[][]) =>
  `${rows
    .map(row => row.map(cell => escapeCommas(cell.toString())).join(","))
    .join("\r\n")}`;

export const fromCsv = (content: string) => {
  const rows = content.split(/\r?\n/);
  return rows.map(row => splitIntoCells(row));
};
