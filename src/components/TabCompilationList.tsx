import { FC } from "preact/compat";

import TabCompilationSummary from "./TabCompilationSummary";
import { useTabCompilationsContext } from "../contexts/TabCompilationsContext";
import { useMemo } from "preact/hooks";

const TabCompilationList: FC = () => {
  const { tabCompilations } = useTabCompilationsContext();
  const compilationsSorted = useMemo(() => {
    const compilations = Object.values(tabCompilations);
    compilations.sort((a, b) => b.savedAt - a.savedAt);
    return compilations;
  }, [tabCompilations]);
  return (
    <ol class="tab-compilation-list">
      {compilationsSorted.map(compilation => (
        <li key={compilation.id}>
          <TabCompilationSummary compilation={compilation} />
        </li>
      ))}
    </ol>
  );
};

export default TabCompilationList;
