import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Tooltip from "@mui/material/Tooltip";

import JournalModal from "../components/JournalModal";

import {
  fetchPortfolioDetails,
  fetchUserData,
  fetchPortfolioData,
  fetchAccounts,
} from "../lib/mockAPI";

import addTagIcon from "../assets/addtag.svg";
import fundsAddedMedal from "../assets/FA_medal.svg";
import payoutMedal from "../assets/payout_medal.svg";
import { get } from "react-scroll/modules/mixins/scroller";

const Dashboard = () => {
  const dataOptions = [
    { label: "Equity", value: "equity" },
    { label: "P/L", value: "pl" },
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioDetails, setPortfolioDetails] = useState({
    value: null,
    currency: "",
    profitLoss: 0,
    profitFactor: 0,
    fundsAdded: 0,
  });
  const [userName, setUserName] = useState("");
  const [data, setData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [dataFilter, setDataFilter] = useState("equity");

  const [isCopierModalOpen, setIsCopierModalOpen] = useState(false);
  const [copiers, setCopiers] = useState([]);
  const [step, setStep] = useState(0);
  const [copierFormState, setCopierFormState] = useState({
    copierName: "",
    masterAccount: "",
    slaveAccounts: [],
    riskProfiles: {},
  });

  const [selectedDayTrades, setSelectedDayTrades] = useState([]);
  const [journalEntries, setJournalEntries] = useState({});
  const [journalStats, setJournalStats] = useState({});

  const handleOpenCopierModal = () => {
    // Reset step and form state when opening the modal for a new copier
    setStep(0);
    setCopierFormState({
      copierName: "",
      masterAccount: "",
      slaveAccounts: [],
      riskProfiles: {},
    });
    setIsCopierModalOpen(true);
  };

  const handleCloseCopierModal = () => {
    setIsCopierModalOpen(false);
  };

  const handleAddCopier = (newCopier) => {
    const id = new Date().getTime(); // or use any unique identifier logic
    setCopiers([...copiers, { ...newCopier, id }]);
    handleCloseCopierModal();
  };

  const handleEditCopier = (updatedCopier) => {
    setCopiers((prevCopiers) =>
      prevCopiers.map((copier) =>
        copier.id === updatedCopier.id ? updatedCopier : copier
      )
    );
  };

  const handleDeleteCopier = (copierToDelete) => {
    setCopiers((prevCopiers) =>
      prevCopiers.filter((copier) => copier.id !== copierToDelete.id)
    );
  };

  useEffect(() => {
    fetchPortfolioDetails().then((details) => {
      setPortfolioDetails((prev) => ({
        ...prev,
        currency: details.portfolioCurrency,
      }));
    });

    fetchUserData().then((user) => {
      setUserName(user.userName);
    });

    fetchPortfolioData().then((data) => {
      if (data && data.length > 0) {
        const sortedData = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(sortedData);

        const initialBalance = sortedData[0]?.initial || 0;
        const totalDeposits = sortedData.reduce(
          (acc, curr) => acc + (curr.deposits || 0),
          0
        );
        const totalWithdrawals = sortedData.reduce(
          (acc, curr) => acc + (curr.withdrawals || 0),
          0
        );
        const totalProfitLoss = sortedData.reduce(
          (acc, curr) => acc + curr.profitLoss,
          0
        );

        const effectiveStartingBalance =
          initialBalance + totalDeposits - totalWithdrawals;

        const profitLossPercentage =
          effectiveStartingBalance !== 0
            ? ((totalProfitLoss / effectiveStartingBalance) * 100).toFixed(2)
            : "0.00";

        setPortfolioDetails((prev) => ({
          ...prev,
          value: sortedData[sortedData.length - 1].ending,
          currency: "$",
          profitLoss: formatNumber(totalProfitLoss),
          profitFactor: calculateProfitFactor(
            totalProfitLoss,
            totalWithdrawals
          ),
          fundsAdded: formatNumber(totalDeposits),
          profitLossPercentage: profitLossPercentage,
        }));
      }
    });
  }, []);

  function calculateProfitFactor(profit, loss) {
    return loss !== 0 ? (profit / loss).toFixed(2) : "N/A";
  }

  function formatNumber(num) {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 100000) {
      return `${(num / 1000).toFixed(0)}K`;
    } else if (num >= 10000) {
      return `${(num / 1000).toFixed(0)}K`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    } else {
      return num.toString();
    }
  }

  useEffect(() => {
    updateFilteredData(data, dataFilter);
  }, [dataFilter, data]);

  const updateFilteredData = (data, filter) => {
    let processedData = [];
    let accumulatedPnL = 0;

    if (filter === "equity") {
      processedData = data.map((day, index) => {
        if (index === 0) {
          return { date: day.date, value: day.initial };
        } else if (index === data.length - 1) {
          return { date: day.date, value: day.ending };
        } else {
          return { date: day.date, value: day.ending };
        }
      });
    } else if (filter === "pl") {
      processedData = data.map((day) => {
        accumulatedPnL += day.profitLoss;
        return {
          date: day.date,
          dailyPnL: day.profitLoss,
          accumulatedPnL: accumulatedPnL,
        };
      });
    }

    setFilteredData(processedData);
  };

  const getJournalEntries = (date) => {
    if (!date) return [];
    return journalEntries[date.toDateString()] || [];
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);

    const dayData = data.find((d) => {
      const dayDate = new Date(d.date);
      const calendarDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      return dayDate.toDateString() === calendarDate.toDateString();
    });

    const dayTrades = dayData ? dayData.trades : [];

    const dailyGainLossPercent = dayData
      ? dayData.dailyGainLossPercent
      : "0.00";
    const tradesTaken = dayData ? dayData.tradesTaken : 0;
    const winRate = dayData ? dayData.winRate : "0";

    setSelectedDayTrades(dayTrades);

    setIsModalOpen(true);

    // Pass the stats to the JournalModal
    setJournalStats({
      dailyGainLossPercent,
      tradesTaken,
      winRate,
    });

    // console.log("Opening JournalModal for date:", date);
    // console.log("Journal entries for date:", getJournalEntries(date));
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSave = (date, entries) => {
    // console.log("Saving entries for date:", date, entries); // Debugging log
    setJournalEntries((prevEntries) => ({
      ...prevEntries,
      [date.toDateString()]: entries,
    }));

    /* console.log("Journal Entries after save:", {
      ...journalEntries,
      [date.toDateString()]: entries,
    }); */ // Debugging log
    setIsModalOpen(false);
  };

  // console.log("Journal Entries:", getJournalEntries(selectedDate));

  return (
    <div className="flex">
      <div
        className=" flex-grow overflow-auto items-center justify-center"
        style={{
          width: `calc(100vw - 280px)`,
        }}
      >
        <div className="flex my-5 mx-2 border rounded-xl border-neutrals-10 bg-gradient-to-br from-neutrals-12/80 via-dark to-neutrals-11/70 backdrop-blur-md">
          <div className="flex flex-col justify-start items-center py-20 px-40 h-full w-full ">
            <div className="w-full flex flex-col justify-center items-center my-10 bg-dark rounded-lg">
              <Calendar
                calendarType="gregory"
                className="w-full h-full p-5 border-neutrals-10 rounded-3xl bg-transparent text-washedPurple-600 backdrop-blur-md"
                tileContent={({ date, view }) => {
                  if (view === "month") {
                    const dayData = data.find((d) => {
                      const dayDate = new Date(d.date);
                      const calendarDate = new Date(
                        Date.UTC(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate()
                        )
                      );
                      return (
                        dayDate.toDateString() === calendarDate.toDateString()
                      );
                    });
                    return (
                      <div
                        className={`tile-content ${
                          dayData
                            ? dayData.profitLoss >= 0
                              ? "bg-green-500/10"
                              : "bg-red-500/10"
                            : ""
                        }`}
                      >
                        {dayData &&
                          (dayData.deposits > 0 || dayData.withdrawals > 0) && (
                            <div className="medals-container">
                              {dayData.deposits > 0 && (
                                <Tooltip
                                  title={`$${formatNumber(
                                    dayData.deposits
                                  )} added`}
                                >
                                  <img
                                    src={fundsAddedMedal}
                                    alt="Funds Added"
                                    className="medal"
                                  />
                                </Tooltip>
                              )}
                              {dayData.withdrawals > 0 && (
                                <Tooltip
                                  title={`$${formatNumber(
                                    dayData.withdrawals
                                  )} payout`}
                                >
                                  <img
                                    src={payoutMedal}
                                    alt="Payout"
                                    className="medal"
                                  />
                                </Tooltip>
                              )}
                            </div>
                          )}
                        <span className="tile-day">{date.getDate()}</span>
                        {dayData ? (
                          <div className="tile-info">
                            <p>
                              {dayData.profitLoss >= 0
                                ? `+${portfolioDetails.currency}${formatNumber(
                                    dayData.profitLoss
                                  )}`
                                : `-${portfolioDetails.currency}${formatNumber(
                                    Math.abs(dayData.profitLoss)
                                  )}`}
                            </p>
                            <p className="tile-trades text-neutrals-7">
                              {dayData.trades.length}{" "}
                              {dayData.trades.length === 1 ? "trade" : "trades"}
                            </p>
                          </div>
                        ) : null}
                      </div>
                    );
                  } else if (view === "year") {
                    return (
                      <span className="tile-month">
                        {date.toLocaleString("default", { month: "short" })}
                      </span>
                    );
                  } else if (view === "decade") {
                    return (
                      <span className="tile-year">{date.getFullYear()}</span>
                    );
                  }
                }}
                onClickDay={(date) => handleDayClick(date)}
              />
              <JournalModal
                isOpen={isModalOpen}
                onClose={handleClose}
                onSave={handleSave}
                selectedDate={selectedDate}
                trades={selectedDayTrades}
                journalEntries={getJournalEntries(selectedDate)}
                stats={journalStats}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
