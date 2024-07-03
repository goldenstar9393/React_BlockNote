import JournalTag from "./JournalTag";

const JournalTags = ({ tags, onTagChange, onTagRemove }) => {
  const handleTagUpdate = (index, newTag) => {
    const updatedTags = [...tags];
    updatedTags[index] = newTag;
    onTagChange(updatedTags);
  };

  const handleTagRemove = (index) => {
    const updatedTags = tags.filter((_, tagIndex) => tagIndex !== index);
    onTagRemove(updatedTags);
  };

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-2 w-full max-w-[calc(100%-10rem)] ">
      {tags.map((tag, index) => (
        <JournalTag
          key={index}
          tag={tag}
          onTagUpdate={(newTag) => handleTagUpdate(index, newTag)}
          onTagRemove={() => handleTagRemove(index)}
        />
      ))}
    </div>
  );
};

export default JournalTags;
