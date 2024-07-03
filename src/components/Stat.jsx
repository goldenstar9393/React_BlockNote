const Stat = ({ number, statName }) => {
  return (
    <div className="h-full w-full border bg-dark border-neutrals-10 rounded-3xl flex justify-between items-center px-10 gap-x-5">
      <h2 className="text-[40px] text-end">{number}</h2>
      <p className="text-balance text-end">{statName}</p>
    </div>
  );
};

export default Stat;
