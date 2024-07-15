import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import JournalModalStats from "./JournalModalStats";
import JournalTags from "./JournalTags";
import Tooltip from "@mui/material/Tooltip";
import JournalEditor from "./JournalEditor";
import "@blocknote/react/style.css";
import addTagIcon from "../assets/addtag.svg";
import backgroundImage from "../assets/bg_photo.jpeg";

const JournalModal = ({
  isOpen,
  onClose,
  selectedDate,
  trades,
  journalEntries,
  onSave,
  stats,
}) => {

  const [entries, setEntries] = useState([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const entriesRef = useRef(entries);

  useEffect(() => {
    if (isOpen) {
      const initialEntries = journalEntries.length
        ? journalEntries
        : [
          {
            date: selectedDate,
            type: "dailySummary",
            blocks: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "",
                    styles: {},
                  },
                ],
              },
            ],
            tags: [],
          },
          ...trades.map((trade) => ({
            date: selectedDate,
            type: "trade",
            blocks: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "",
                    styles: {},
                  },
                ],
              },
            ],
            tags: [],
            trade,
          })),
        ];
      setEntries(initialEntries);
      entriesRef.current = initialEntries;
      setSelectedTabIndex(0);
    }
  }, [isOpen, selectedDate, trades, journalEntries]);

  useEffect(() => {
    console.log("Entries updated:", entries);
    // setEntries(entries);
  }, [entries]);

  const handleContentChange = (updatedBlocks) => {
    const updatedEntries = entriesRef.current.map((entry, index) =>
      index === selectedTabIndex ? { ...entry, blocks: updatedBlocks } : entry
    );
    setEntries(updatedEntries);
    entriesRef.current = updatedEntries;
  };

  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
  };

  const handleCloseModal = () => {
    onSave(selectedDate, entriesRef.current);
    setEntries([]); // Clear entries on close
    setSelectedTabIndex(0); // Reset tab index on close
    onClose();
  };

  const handleTagChange = (index, updatedTags) => {
    const updatedEntries = entriesRef.current.map((entry, idx) =>
      idx === index ? { ...entry, tags: updatedTags } : entry
    );
    setEntries(updatedEntries);
    entriesRef.current = updatedEntries;
  };

  const addTag = () => {
    const updatedTags = [...(entries[selectedTabIndex]?.tags || []), ""];
    handleTagChange(selectedTabIndex, updatedTags);
  };

  if (!isOpen) return null;
  const selectedEntry = entries[selectedTabIndex] || {};
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 top-0 left-0 bg-dark bg-opacity-80 h-full flex justify-center items-center"
      onClick={handleCloseModal}
    >
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-5/6 w-1/6 flex flex-col items-center border border-r-0 border-neutrals-10 rounded-l-xl"
      >
        <div
          className="h-[56px] w-full bg-primaryPurple-500 flex justify-center items-center rounded-tl-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h5 className="font-semibold text-[20px] absolute">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </h5>
        </div>
        <div
          className="h-full flex flex-col justify-center bg-dark/80 w-full backdrop-blur-sm overflow-x-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <JournalModalStats
            dailyGainLossPercent={stats.dailyGainLossPercent}
            tradesTaken={stats.tradesTaken}
            winRate={stats.winRate}
          />
        </div>
      </div>
      <div
        className="bg-neutrals-13 pl-4 pr-4 pb-4 rounded-r-lg border border-neutrals-10 shadow-lg flex flex-col w-1/2 h-5/6 px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-start ">
          {entries.map((entry, index) => (
            <button
              key={index}
              onClick={() => handleTabSelect(index)}
              className={`${selectedTabIndex === index
                ? "bg-washedPurple-500 bg-opacity-20"
                : "bg-washedPurple-500 bg-opacity-10"
                } bg-transparent rounded-bl-lg rounded-br-lg mx-1 px-4 py-2 cursor-pointer text-washedPurple-500`}
            >
              {entry.type === "dailySummary"
                ? "Daily Summary"
                : `${index} - ${entry.trade.symbol}`}
            </button>
          ))}
        </div>

        <div className="mx-2 mt-3 pt-5 h-1/5 w-full flex justify-around items-start ">
          <JournalTags
            tags={selectedEntry.tags || []}
            onTagChange={(updatedTags) =>
              handleTagChange(selectedTabIndex, updatedTags)
            }
            onTagRemove={(updatedTags) =>
              handleTagChange(selectedTabIndex, updatedTags)
            }
          />
          <button onClick={addTag}>
            <Tooltip title="Add New Tag">
              <img
                src={addTagIcon}
                className="hover:scale-[1.10] ease-in-out active:scale-[0.98] active:duration-75 transition-all"
              />
            </Tooltip>
          </button>
        </div>

        <div className="flex flex-col items-center justify-between w-full h-3/4 my-5">
          {selectedEntry?.blocks && selectedEntry?.blocks.length &&
            <JournalEditor
              key={selectedTabIndex}
              journalEntry={
                selectedEntry?.blocks
              }
              onChange={handleContentChange}
            />}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default JournalModal;
