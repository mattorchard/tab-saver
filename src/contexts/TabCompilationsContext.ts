import { createContext } from "preact";
import useTabCompilations from "../hooks/useTabCompilations";
import { useContext } from "preact/hooks";

export const TabCompilationsContext = createContext<
  ReturnType<typeof useTabCompilations>
>(null!);

export const useTabCompilationsContext = () =>
  useContext(TabCompilationsContext);
