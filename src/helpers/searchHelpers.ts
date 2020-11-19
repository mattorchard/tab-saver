import { TabCompilation } from "../hooks/useTabCompilations";

const tokenize = (text: string) =>
  text
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

const getScore = (tabCompilation: TabCompilation, tokens: string[]) => {
  let score = 0;
  tokens.forEach(token => {
    if (tabCompilation.title?.toLowerCase().includes(token)) {
      score += 100;
      debugger;
    }
    tabCompilation.tabs.forEach(tab => {
      if (tab.title?.toLowerCase()?.includes(token)) {
        score += 10;
      }
      if (tab.url?.toLowerCase().includes(token)) {
        score += 1;
      }
    });
  });
  return score;
};

export const searchCompilations = (
  tabCompilations: TabCompilation[],
  query: string
) => {
  const tokens = tokenize(query);
  const scored = tabCompilations.map((compilation): [
    number,
    TabCompilation
  ] => [getScore(compilation, tokens), compilation]);
  const filtered = scored.filter(([score]) => score > 0);
  const ranked = filtered.sort(([a], [b]) => b - a);
  return ranked.map(([, compilation]) => compilation);
};
