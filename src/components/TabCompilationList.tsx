import { FC } from "preact/compat";

import TabCompilationSummary from "./TabCompilationSummary";
import { useTabCompilationsContext } from "../contexts/TabCompilationsContext";
import { useMemo } from "preact/hooks";
import Icon from "./Icon";
import useSortSpinner from "../hooks/useSortSpinner";

const TabCompilationList: FC = () => {
  const { tabCompilations } = useTabCompilationsContext();
  const [sortDetails, nextSort] = useSortSpinner();
  const compilationsSorted = useMemo(() => {
    const compilations = Object.values(tabCompilations);
    compilations.sort(sortDetails.comparator);
    return compilations;
  }, [tabCompilations, sortDetails]);

  return (
    <section>
      <div className="tab-compilation-list-header">
        <button type="button" class="neu" onClick={nextSort}>
          <Icon name="sort" /> {sortDetails.name}
        </button>
      </div>
      <ol class="tab-compilation-list">
        {compilationsSorted.map(compilation => (
          <li key={compilation.id}>
            <TabCompilationSummary compilation={compilation} />
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TabCompilationList;
