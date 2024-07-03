import React, { useEffect } from "react";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";

const JournalEditor = ({ journalEntry, onChange }) => {
  const editor = useCreateBlockNote({
    initialContent: journalEntry,
  });

  const handleEditorChange = () => {
    const updatedBlocks = editor.document;
    onChange(updatedBlocks);
  };

  useEffect(() => {
    console.log("JournalEditor received journalEntry:", journalEntry);
  }, [journalEntry]);

  return (
    <BlockNoteView
      editor={editor}
      onChange={handleEditorChange}
      className="text-white h-full w-full bg-transparent rounded-xl overflow-y-scroll"
      style={{ resize: "none", padding: "2rem" }}
    />
  );
};

export default JournalEditor;
