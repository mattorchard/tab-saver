import { FC } from "preact/compat";
import { getAllTabs, getTabsInCurrentWindow } from "../helpers/tabHelpers";
import { useTabCompilationsContext } from "../contexts/TabCompilationsContext";

const SaveSection: FC = () => {
  const { saveCompilation } = useTabCompilationsContext();

  const saveAll = async () => await saveCompilation(await getAllTabs());
  const saveWindow = async () =>
    await saveCompilation(await getTabsInCurrentWindow());

  return (
    <header class="save-section">
      <h1>Tab Saver</h1>
      <button class="neu" type="button" onClick={saveWindow}>
        Save Window
      </button>
      <button class="neu" type="button" onClick={saveAll}>
        Save All
      </button>
    </header>
  );
};

export default SaveSection;
