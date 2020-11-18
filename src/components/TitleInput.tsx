import { TabCompilation } from "../hooks/useTabCompilations";
import { FC } from "preact/compat";
import { useLayoutEffect, useRef, useState } from "preact/hooks";
import { useTabCompilationsContext } from "../contexts/TabCompilationsContext";

const TitleInput: FC<{ compilation: TabCompilation }> = ({ compilation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { setCompilationTitle } = useTabCompilationsContext();
  useLayoutEffect(() => inputRef.current?.focus(), [isEditing]);
  if (isEditing) {
    return (
      <h2>
        <input
          className="flush-input"
          aria-label="Edit title"
          placeholder="Custom Title"
          ref={inputRef}
          value={compilation.title}
          onBlur={() => {
            setIsEditing(false);
            setCompilationTitle(
              compilation.id,
              inputRef.current!.value.trim() || undefined
            );
          }}
        />
      </h2>
    );
  }
  const savedAt = new Date(compilation.savedAt);
  return (
    <h2 tabIndex={0} onClick={() => setIsEditing(true)}>
      {compilation.title || (
        <time dateTime={savedAt.toISOString()}>
          {savedAt.toLocaleString("en-ca")}
        </time>
      )}
    </h2>
  );
};

export default TitleInput;
