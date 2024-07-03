import JournalModalStat from "./JournalModalStat";

const JournalModalStats = ({ dailyGainLossPercent, tradesTaken, winRate }) => {
  return (
    <div className="h-3/4 w-full flex flex-col justify-end gap-y-10 pr-10">
      <JournalModalStat
        stat={`${dailyGainLossPercent}%`}
        name={dailyGainLossPercent < 0 ? "Daily Loss" : "Daily Gain"}
      />
      <JournalModalStat stat={tradesTaken.toString()} name="Trades Taken" />
      <JournalModalStat stat={`${winRate}%`} name="Win Rate" />
    </div>
  );
};

export default JournalModalStats;
