import AppHeader from "./components/AppHeader";
import "./globals.css";
import useTabCompilations from "./hooks/useTabCompilations";
import { TabCompilationsContext } from "./contexts/TabCompilationsContext";
import TabCompilationList from "./components/TabCompilationList";

const App = () => {
  const contextValue = useTabCompilations();

  return (
    <TabCompilationsContext.Provider value={contextValue}>
      <main>
        <AppHeader />
        <TabCompilationList />
      </main>
    </TabCompilationsContext.Provider>
  );
};

const WrappedApp = () => <App />;

export default WrappedApp;
