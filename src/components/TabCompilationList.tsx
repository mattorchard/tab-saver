import { FC } from "preact/compat";

import TabCompilationSummary from "./TabCompilationSummary";
import { useTabCompilationsContext } from "../contexts/TabCompilationsContext";
import { useMemo, useState } from "preact/hooks";
import Icon from "./Icon";
import useSortSpinner from "../hooks/useSortSpinner";
import { searchCompilations } from "../helpers/searchHelpers";

const TabCompilationList: FC = () => {
  const { tabCompilations } = useTabCompilationsContext();
  const [sortDetails, nextSort] = useSortSpinner();
  const [query, setQuery] = useState("");

  const compilationsSorted = useMemo(() => {
    const compilations = Object.values(tabCompilations);
    compilations.sort(sortDetails.comparator);
    return compilations;
  }, [tabCompilations, sortDetails]);

  const compilationsFiltered = useMemo(() => {
    const cleanQuery = query.trimStart().trimEnd();
    if (!cleanQuery) return compilationsSorted;
    return searchCompilations(compilationsSorted, query);
  }, [compilationsSorted, query]);

  return (
    <section>
      <div className="tab-compilation-list-header">
        <div className="neu search-input__container">
          <input
            className="flush-input search-input"
            // @ts-ignore
            incremental
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onSearch={event => setQuery(event.currentTarget.value)}
          />
          <button
            type="reset"
            onClick={() => setQuery("")}
            title="Clear Search"
            disabled={!query}
          >
            <Icon name="times" />
          </button>
        </div>
        <button
          type="button"
          className="neu"
          onClick={nextSort}
          disabled={Boolean(query)}
        >
          <Icon name="sort" /> {query ? "Best Search" : sortDetails.name}
        </button>
      </div>
      {compilationsFiltered.length === 0 && compilationsSorted.length !== 0 && (
        <p className="no-results-message">No results</p>
      )}
      <ol className="tab-compilation-list">
        {compilationsFiltered.map(compilation => (
          <li key={compilation.id}>
            <TabCompilationSummary compilation={compilation} />
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TabCompilationList;
