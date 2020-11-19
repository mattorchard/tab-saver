import { useCallback, useState } from "preact/hooks";
import { TabCompilation } from "./useTabCompilations";

type SortOption = {
  name: string;
  comparator: (a: TabCompilation, b: TabCompilation) => number;
};

const getMostRecentStat = (c: TabCompilation): number =>
  [
    Math.max(c.downloadedAt!, c.openedAt!),
    c.downloadedAt,
    c.openedAt,
    c.savedAt // Always truthy
  ].find(Boolean)!;

const sortOptions: SortOption[] = [
  {
    name: "Relevant First",
    comparator: (a, b) => getMostRecentStat(b) - getMostRecentStat(a)
  },
  { name: "Newest First", comparator: (a, b) => b.savedAt - a.savedAt },
  { name: "Oldest First", comparator: (a, b) => a.savedAt - b.savedAt }
];

const useSortSpinner = (): [SortOption, () => void] => {
  const [optionIndex, setOptionIndex] = useState(0);

  const nextOption = useCallback(
    () => setOptionIndex(index => (index + 1) % sortOptions.length),
    []
  );

  return [sortOptions[optionIndex], nextOption];
};

export default useSortSpinner;
