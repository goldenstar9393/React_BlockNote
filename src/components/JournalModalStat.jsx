const JournalModalStat = ({ name, stat }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className=" w-full h-full flex-col flex justify-center items-end rounded-xl ">
        <h2 className="text-primaryPurple-300/70">{stat}</h2>
        <h4 className="text-[25px] mt-[-6px] text-neutrals-5 ">{name}</h4>
      </div>
    </div>
  );
};

export default JournalModalStat;
