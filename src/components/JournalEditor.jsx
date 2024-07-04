import React, { useEffect } from "react";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import "@blocknote/mantine/style.css";
import YPartyKitProvider from "y-partykit/provider";
import * as Y from "yjs";
const doc = new Y.Doc();
const provider = new YPartyKitProvider(
  "blocknote-dev.yousefed.partykit.dev",
  // Use a unique name as a "room" for your application.
  "your-project-name",
  doc
);
const getRandomElement = (list) => list[Math.floor(Math.random() * list.length)];

// Example usage:
const colors = ['red', 'green', 'blue', 'yellow'];
const names = ['Alice', 'Bob', 'Charlie', 'Diana'];

// Function to get a random color
const getRandomColor = () => getRandomElement(colors);

// Function to get a random name
const getRandomName = () => getRandomElement(names);

const JournalEditor = ({ journalEntry, onChange }) => {
  const editor = useCreateBlockNote({
    initialContent: journalEntry,
    collaboration: {
      // The Yjs Provider responsible for transporting updates:
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),
      // Information (name and color) for this user:
      user: {
        name: getRandomName(),
        color: getRandomColor(),
      },
    },
  });
  // console.log("Editor", editor);
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
