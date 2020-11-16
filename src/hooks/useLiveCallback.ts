import useAsRef from "./useAsRef";
import { useCallback } from "preact/hooks";

const useLiveCallback = <A extends any[], R>(callback: (...args: A) => R) => {
  const callbackRef = useAsRef(callback);
  return useCallback((...args: A) => callbackRef.current(...args), [
    callbackRef
  ]);
};

export default useLiveCallback;
