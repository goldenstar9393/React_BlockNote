// PORTFOLIO VALUE
export const fetchPortfolioDetails = () => {
  return Promise.resolve({ portfolioValue: 0, portfolioCurrency: "$" });
};

export const fetchUserData = () => {
  return Promise.resolve({ userName: "John Doe" });
};

const accountsData = [
  {
    id: "001",
    status: true,
    accountNumber: "123456",
    accountName: "adsadf",
    platform: "asdfadgrgh",
    balance: 25000,
    connection: true,
    settings: "settings",
  },
  {
    id: "002",
    status: false,
    accountNumber: "654321",
    accountName: "1adsfasdf",
    platform: "adfafd",
    balance: 15000,
    connection: false,
    settings: "settings",
  },
];

export const fetchAccounts = () => {
  return Promise.resolve(accountsData);
};

const openPositionsData = [
  {
    orderId: "OID123456",
    accountNumber: "123456",
    symbol: "ESM24",
    direction: "Buy",
    openingTime: "2024-05-07T14:59:59.945Z",
    entryPrice: 4120.75,
    commission: -50,
    grossProfit: 300,
    points: 6,
    netProfit: 250,
  },
  {
    orderId: "OID789123",
    accountNumber: "123456",
    symbol: "CLZ24",
    direction: "Sell",
    openingTime: "2024-05-09T14:59:59.945Z",
    entryPrice: 4120.75,
    commission: -50,
    grossProfit: 300,
    points: 6,
    netProfit: 250,
  },
];

export const fetchOpenPositions = () => {
  return Promise.resolve(openPositionsData);
};

export const addAccount = (accountInfo) => {
  const maxId = accountsData.reduce(
    (max, account) => Math.max(max, parseInt(account.id, 10)),
    0
  );
  const newId = (maxId + 1).toString().padStart(3, "0");

  return Promise.resolve({
    ...accountInfo,
    id: newId,
    status: false,
    balance: 0,
    connection: false,
    settings: "settings",
  });
};

export const updateAccount = (accountInfo) => {
  const index = accountsData.findIndex((acc) => acc.id === accountInfo.id);
  if (index !== -1) {
    // Update the existing account
    accountsData[index] = {
      ...accountsData[index],
      ...accountInfo,
    };
  } else {
    // This block will simulate adding the account if it does not exist
    const newAccount = {
      ...accountInfo,
      id: accountInfo.id || Date.now().toString(), // Use a timestamp as a makeshift ID
    };
    accountsData.push(newAccount);
    return Promise.resolve(newAccount);
  }
  return Promise.resolve(accountsData[index]);
};

// MOCK PORTFOLIO DATA
const mockData = [
  {
    date: "2023-01-12",
    initial: 100000,
    ending: 105000,
    profitLoss: 5000,
    deposits: 5000,
    withdrawals: 0,
    trades: [
      {
        symbol: "ESM24",
        direction: "Buy",
        entryPrice: 3800,
        exitPrice: 3850,
        netProfit: 2500,
      },
      {
        symbol: "NQM24",
        direction: "Sell",
        entryPrice: 12000,
        exitPrice: 11900,
        netProfit: 2500,
      },
    ],
  },
  {
    date: "2023-02-12",
    initial: 105000,
    ending: 110000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "CLM24",
        direction: "Buy",
        entryPrice: 60,
        exitPrice: 65,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2023-03-12",
    initial: 110000,
    ending: 115000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "ESM24",
        direction: "Buy",
        entryPrice: 3900,
        exitPrice: 3950,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2023-04-12",
    initial: 115000,
    ending: 110000,
    profitLoss: -5000,
    deposits: 0,
    withdrawals: 10000,
    trades: [
      {
        symbol: "NQM24",
        direction: "Sell",
        entryPrice: 12200,
        exitPrice: 12300,
        netProfit: -5000,
      },
    ],
  },
  {
    date: "2023-05-12",
    initial: 110000,
    ending: 115000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "CLM24",
        direction: "Buy",
        entryPrice: 65,
        exitPrice: 70,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2023-06-12",
    initial: 115000,
    ending: 120000,
    profitLoss: 5000,
    deposits: 5000,
    withdrawals: 0,
    trades: [
      {
        symbol: "ESM24",
        direction: "Buy",
        entryPrice: 4000,
        exitPrice: 4050,
        netProfit: 2500,
      },
      {
        symbol: "NQM24",
        direction: "Sell",
        entryPrice: 12500,
        exitPrice: 12450,
        netProfit: 2500,
      },
    ],
  },
  {
    date: "2023-07-12",
    initial: 120000,
    ending: 125000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "CLM24",
        direction: "Buy",
        entryPrice: 72,
        exitPrice: 77,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2023-08-12",
    initial: 125000,
    ending: 130000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "ESM24",
        direction: "Buy",
        entryPrice: 4100,
        exitPrice: 4150,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2023-09-12",
    initial: 130000,
    ending: 135000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "NQM24",
        direction: "Sell",
        entryPrice: 12700,
        exitPrice: 12600,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2023-10-12",
    initial: 135000,
    ending: 140000,
    profitLoss: 5000,
    deposits: 5000,
    withdrawals: 0,
    trades: [
      {
        symbol: "CLM24",
        direction: "Buy",
        entryPrice: 75,
        exitPrice: 80,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2023-11-12",
    initial: 140000,
    ending: 135000,
    profitLoss: -5000,
    deposits: 0,
    withdrawals: 10000,
    trades: [
      {
        symbol: "ESM24",
        direction: "Buy",
        entryPrice: 4200,
        exitPrice: 4150,
        netProfit: -5000,
      },
    ],
  },
  {
    date: "2023-12-12",
    initial: 135000,
    ending: 140000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "NQM24",
        direction: "Sell",
        entryPrice: 12800,
        exitPrice: 12700,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2024-01-12",
    initial: 140000,
    ending: 145000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "CLM24",
        direction: "Buy",
        entryPrice: 82,
        exitPrice: 87,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2024-02-12",
    initial: 145000,
    ending: 150000,
    profitLoss: 5000,
    deposits: 10000,
    withdrawals: 0,
    trades: [
      {
        symbol: "ESM24",
        direction: "Buy",
        entryPrice: 4300,
        exitPrice: 4350,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2024-07-04",
    initial: 150000,
    ending: 155000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "NQM24",
        direction: "Sell",
        entryPrice: 13000,
        exitPrice: 12900,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2024-07-09",
    initial: 155000,
    ending: 160000,
    profitLoss: 5000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "CLM24",
        direction: "Buy",
        entryPrice: 85,
        exitPrice: 90,
        netProfit: 5000,
      },
    ],
  },
  {
    date: "2024-07-10",
    initial: 160000,
    ending: 155000,
    profitLoss: -5000,
    deposits: 5000,
    withdrawals: 10000,
    trades: [
      {
        symbol: "ESM24",
        direction: "Buy",
        entryPrice: 4400,
        exitPrice: 4350,
        netProfit: -5000,
      },
    ],
  },
  {
    date: "2024-07-15",
    initial: 155000,
    ending: 145000,
    profitLoss: -10000,
    deposits: 0,
    withdrawals: 0,
    trades: [
      {
        symbol: "NQM24",
        direction: "Sell",
        entryPrice: 13200,
        exitPrice: 13100,
        netProfit: -5000,
      },
      {
        symbol: "CLM24",
        direction: "Buy",
        entryPrice: 95,
        exitPrice: 90,
        netProfit: -5000,
      },
    ],
  },
];

// Function to calculate daily gain/loss percentage, trades taken, and win rate
const calculateDailyStats = (data) => {
  return data.map((day) => {
    const dailyGainLossPercent = ((day.profitLoss / day.initial) * 100).toFixed(
      2
    );
    const tradesTaken = day.trades.length;
    const wins = day.trades.filter((trade) => trade.netProfit > 0).length;
    const winRate = Math.round((wins / tradesTaken) * 100);

    return {
      ...day,
      dailyGainLossPercent,
      tradesTaken,
      winRate,
    };
  });
};

const updatedMockData = calculateDailyStats(mockData);

export const fetchPortfolioData = () => {
  return Promise.resolve(updatedMockData);
};
