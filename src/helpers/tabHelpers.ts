import QueryInfo = chrome.tabs.QueryInfo;
import Tab = chrome.tabs.Tab;
import Window = chrome.windows.Window;

const getCurrentWindow = (): Promise<Window> =>
  new Promise(resolve => chrome.windows.getCurrent(resolve));

const queryTabs = (queryInfo: QueryInfo): Promise<Tab[]> =>
  new Promise(resolve => chrome.tabs.query(queryInfo, resolve));

export const getAllTabs = () => queryTabs({});

export const getTabsInCurrentWindow = async () => {
  const { id: windowId } = await getCurrentWindow();
  return await queryTabs({ windowId });
};

const createWindow = (): Promise<Window> =>
  new Promise(resolve => chrome.windows.create(resolve));

const createTab = (tabProperties: chrome.tabs.CreateProperties): Promise<Tab> =>
  new Promise(resolve => chrome.tabs.create(tabProperties, resolve));

const updateTab = (
  tabId: number,
  tabProperties: chrome.tabs.UpdateProperties
): Promise<Tab> =>
  new Promise(resolve => chrome.tabs.update(tabId, tabProperties, resolve));

export const createTabs = async (tabs: Tab[], newWindow: boolean) => {
  if (!newWindow) {
    return await Promise.all(tabs.map(tab => createTab({ url: tab.url })));
  }

  const { id: windowId } = await createWindow();
  // Get the empty tab created with the new window
  const [firstTabInNewWindow] = await queryTabs({ windowId });
  const [firstTabToCreate, ...otherTabsToCreate] = tabs;

  return await Promise.all([
    // Set the first tab's url
    updateTab(firstTabInNewWindow.id!, { url: firstTabToCreate.url }),
    // Create tabs for the rest of the URlS
    ...otherTabsToCreate.map(tab => createTab({ url: tab.url, windowId }))
  ]);
};
