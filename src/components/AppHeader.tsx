import { FC } from "preact/compat";
import { getAllTabs, getTabsInCurrentWindow } from "../helpers/tabHelpers";
import { useTabCompilationsContext } from "../contexts/TabCompilationsContext";
import { showFilePicker } from "../helpers/fileHelpers";
import { importTabs } from "../helpers/importHelpers";
import Icon from "./Icon";
import { useState } from "preact/hooks";
import { isAncestor } from "../helpers/domHelpers";

const AppHeader: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { saveCompilation } = useTabCompilationsContext();

  const saveAll = async () => await saveCompilation(await getAllTabs());
  const saveWindow = async () =>
    await saveCompilation(await getTabsInCurrentWindow());

  const upload = () =>
    showFilePicker(
      { accept: "text/csv", multiple: true },
      async files =>
        await Promise.all(
          files.map(async file => {
            const tabs = await importTabs(file);
            const title = file.name.replace(/\.csv$/, "");
            await saveCompilation(tabs, title);
          })
        )
    );

  const handleFocusOut = ({ currentTarget, relatedTarget }: FocusEvent) => {
    if (!isAncestor(currentTarget as HTMLElement, relatedTarget as Node))
      setIsDrawerOpen(false);
  };

  return (
    <header class="save-header">
      <h1>Tab Saver</h1>
      <button class="neu" type="button" onClick={saveWindow}>
        <Icon name="save-outline" /> Window
      </button>
      <button class="neu" type="button" onClick={saveAll}>
        <Icon name="save" /> All
      </button>

      <div
        className="drawer__container"
        // @ts-ignore
        onfocusout={handleFocusOut}
      >
        <button
          class="neu icon-button"
          title="Toggle drawer"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <Icon name="chevron-down" />
        </button>
        {isDrawerOpen && (
          <div role="menu" className="drawer" aria-hidden={!isDrawerOpen}>
            <button
              class="neu icon-button"
              title="Upload file"
              onClick={upload}
            >
              <Icon name="file-upload" />
            </button>
            <button
              class="neu icon-button"
              title="Upload file"
              onClick={upload}
            >
              <Icon name="file-upload" />
            </button>
            <button
              class="neu icon-button"
              title="Upload file"
              onClick={upload}
            >
              <Icon name="file-upload" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
