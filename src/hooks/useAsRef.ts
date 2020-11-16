import { useEffect, useRef } from "preact/hooks";

const useAsRef = <T>(value: T) => {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
};

export default useAsRef;
