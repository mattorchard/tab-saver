import { FC } from "preact/compat";
import { TabCompilation } from "../hooks/useTabCompilations";
import Tab = chrome.tabs.Tab;
import Icon from "./Icon";
import { useTabCompilationsContext } from "../contexts/TabCompilationsContext";
import TitleInput from "./TitleInput";

const TabSummary: FC<{ tab: Tab }> = ({ tab }) => (
  <a
    className="tab-summary"
    href={tab.url}
    target="_blank"
    rel="noreferrer noopener"
    title={tab.title}
  >
    {tab.favIconUrl && <img src={tab.favIconUrl} alt="" className="favicon" />}
    <span className="ellipses">{tab.title}</span>
  </a>
);

const TabCompilationSummary: FC<{ compilation: TabCompilation }> = ({
  compilation
}) => {
  const {
    openCompilation,
    downloadCompilation,
    deleteCompilation
  } = useTabCompilationsContext();

  return (
    <div className="tab-compilation-summary neu">
      <header className="tab-compilation-summary__header">
        <TitleInput compilation={compilation} />
        <button
          type="button"
          className="neu icon-button"
          title="Open in this window"
          onClick={() => openCompilation(compilation.id, false)}
        >
          <Icon name="external-link-square-alt" />
        </button>
        <button
          type="button"
          className="neu icon-button"
          title="Open in new window"
          onClick={() => openCompilation(compilation.id, true)}
        >
          <Icon name="window-restore" />
        </button>
        <button
          type="button"
          className="neu icon-button"
          title="Download"
          onClick={() => downloadCompilation(compilation.id)}
        >
          <Icon name="download" />
        </button>
        <button
          type="button"
          className="neu icon-button"
          title="Delete"
          onClick={() => deleteCompilation(compilation.id)}
        >
          <Icon name="window-close" />
        </button>
      </header>
      <ul>
        {compilation.tabs.map(tab => (
          <li key={tab.id}>
            <TabSummary tab={tab} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabCompilationSummary;
