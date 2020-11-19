import Tab = chrome.tabs.Tab;

import useLiveCallback from "./useLiveCallback";
import useChromeStorage from "./useChromeStorage";
import { createTabs } from "../helpers/tabHelpers";
import { exportTabCompilation } from "../helpers/exportHelpers";

export type TabCompilation = {
  id: string;
  tabs: Tab[];
  title?: string;
  savedAt: number;
  downloadedAt?: number;
  openedAt?: number;
};

const randomId = () => Math.floor(Math.random() * 1_000_000).toString();

const useTabCompilations = () => {
  const [tabCompilations, setTabCompilations, isLoading] = useChromeStorage<{
    [id: string]: TabCompilation;
  }>("local", "tabCompilations");

  const setTabCompilation = (
    compilation: Partial<TabCompilation> & { id: string }
  ) =>
    setTabCompilations({
      ...tabCompilations,
      [compilation.id]: {
        ...tabCompilations?.[compilation.id],
        ...compilation
      } as TabCompilation
    });

  const openCompilation = useLiveCallback(
    async (compilationId: string, newWindow: boolean) => {
      const compilation = tabCompilations?.[compilationId];
      if (!compilation) return;
      await createTabs(compilation.tabs, newWindow);
      setTabCompilation({ id: compilationId, openedAt: Date.now() });
    }
  );

  const downloadCompilation = useLiveCallback((compilationId: string) => {
    const compilation = tabCompilations?.[compilationId];
    if (!compilation) return;
    exportTabCompilation(compilation);
    setTabCompilation({ id: compilationId, downloadedAt: Date.now() });
  });

  const saveCompilation = useLiveCallback((tabs: Tab[], title?: string) =>
    setTabCompilation({ id: randomId(), savedAt: Date.now(), tabs, title })
  );

  const setCompilationTitle = useLiveCallback(
    (compilationId: string, title?: string) =>
      setTabCompilation({ id: compilationId, title })
  );

  const deleteCompilation = useLiveCallback(compilationId => {
    const filteredCompilations = { ...tabCompilations };
    delete filteredCompilations[compilationId];
    setTabCompilations(filteredCompilations);
  });

  return {
    tabCompilations: tabCompilations || {},
    isLoading,
    openCompilation,
    downloadCompilation,
    saveCompilation,
    deleteCompilation,
    setCompilationTitle
  };
};

export default useTabCompilations;
