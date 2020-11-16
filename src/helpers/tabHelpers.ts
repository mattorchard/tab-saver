import QueryInfo = chrome.tabs.QueryInfo;
import Tab = chrome.tabs.Tab;
import Window = chrome.windows.Window;

const getCurrentWindow = (): Promise<Window> =>
  new Promise(resolve => chrome.windows.getCurrent(resolve));

const queryTabs = (queryInfo: QueryInfo): Promise<Tab[]> =>
  new Promise(resolve => chrome.tabs.query(queryInfo, resolve));

export const getAllTabs = () => queryTabs({});

export const getTabsInCurrentWindow = async () => {
  const currentWindow = await getCurrentWindow();
  return await queryTabs({ windowId: currentWindow.id });
};

const createWindow = (): Promise<Window> =>
  new Promise(resolve => chrome.windows.create(resolve));

const createTab = (tabProperties: chrome.tabs.CreateProperties): Promise<Tab> =>
  new Promise(resolve => chrome.tabs.create(tabProperties, resolve));

export const createTabs = async (tabs: Tab[], newWindow: boolean) => {
  if (newWindow) {
    // Todo: Get and replace first new tab in new window
    const { id: windowId } = await createWindow();
    await Promise.all(tabs.map(tab => createTab({ url: tab.url, windowId })));
  } else {
    await Promise.all(tabs.map(tab => createTab({ url: tab.url })));
  }
};
