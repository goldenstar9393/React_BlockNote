import { useState, useEffect } from "react";

const JournalTag = ({ tag, onTagUpdate, onTagRemove }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tagName, setTagName] = useState(tag);

  useEffect(() => {
    setTagName(tag);
  }, [tag]);

  const handleBlur = () => {
    setIsEditing(false);
    onTagUpdate(tagName);
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\s+/g, ""); // Remove spaces
    setTagName(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="relative flex items-center justify-center mx-1">
      <div
        className="flex items-center justify-center bg-transparent rounded-full"
        style={{
          background: "linear-gradient(90deg, #8D33FF, #0469FF)",
          padding: "1px",
        }}
      >
        <div
          className="flex items-center justify-center bg-dark rounded-full px-2 py-1"
          style={{
            backgroundClip: "padding-box",
          }}
        >
          {isEditing ? (
            <input
              className="bg-transparent outline-none text-center text-washedPurple-500"
              value={tagName}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              style={{ width: `${tagName.length + 1}ch`, minWidth: "100px" }}
            />
          ) : (
            <span
              className={`bg-transparent outline-none text-center cursor-text ${
                tagName
                  ? "text-washedPurple-500"
                  : "text-washedPurple-700 italic text-[14px]"
              }`}
              onClick={() => setIsEditing(true)}
              style={{ width: `${tagName.length + 1}ch`, minWidth: "100px" }}
            >
              {tagName ? `#${tagName}` : "tag name..."}
            </span>
          )}
          <button
            onClick={onTagRemove}
            className="flex justify-center items-center text-neutrals-6 hover:bg-red-400 text-[12px] h-4 w-4 rounded-full hover:text-white duration-300 ease-in-out ml-2"
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalTag;
