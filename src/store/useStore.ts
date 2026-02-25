import { create } from "zustand";

export type AgentRole =
  | "MINER"
  | "SCOUT"
  | "ANALYST"
  | "TRADER"
  | "FUND_MANAGER"
  | "MARKET_MAKER"
  | "OPS"
  | "CS"
  | "AUDIT";

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  level: number;
  status: "working" | "resting";
  output: string;
  quote: string;
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: string;
  mcap: string;
  aiStatus: "working" | "resting";
  type: "HOT" | "NEW" | "TOP" | "CREATED";
  strategy?: string;
  aiStats?: { tweets: number; replies: number; newFollowers: number };
}

export interface Holding {
  tokenId: string;
  amount: number;
  avgPrice: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface StoreState {
  // Balances
  balances: { USDT: number; TAI: number };
  totalAssets: number;
  maxAssets: number;

  // Data
  holdings: Holding[];
  createdTokens: Token[];
  marketTokens: Token[];
  aiAgents: Agent[];
  liveFeed: { id: number; time: string; text: string; type: string }[];
  toasts: ToastMessage[];

  // Actions
  buyToken: (tokenId: string, amount: number, cost: number) => void;
  sellToken: (tokenId: string, amount: number, revenue: number) => void;
  launchToken: (
    token: Omit<Token, "id">,
    cost: number,
    hiredAgents: Agent[],
  ) => void;
  updateAgentStrategy: (tokenId: string, strategy: string) => void;
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
  addFeedEvent: (text: string, type: string) => void;
}

const initialMarketTokens: Token[] = [
  {
    id: "0x123",
    name: "NEON COIN",
    symbol: "$NEON",
    price: 1.45,
    change: "+14.4%",
    mcap: "$1.2M",
    aiStatus: "working",
    type: "HOT",
  },
  {
    id: "0x456",
    name: "CYBER PUNK",
    symbol: "$CYBER",
    price: 0.89,
    change: "-2.1%",
    mcap: "$800K",
    aiStatus: "resting",
    type: "HOT",
  },
  {
    id: "0x789",
    name: "PIXEL DOGE",
    symbol: "$PDOGE",
    price: 0.004,
    change: "+150.2%",
    mcap: "$45K",
    aiStatus: "working",
    type: "NEW",
  },
  {
    id: "0xabc",
    name: "AI ALPHA",
    symbol: "$ALPHA",
    price: 12.5,
    change: "+45.8%",
    mcap: "$12M",
    aiStatus: "working",
    type: "TOP",
  },
  {
    id: "0xdef",
    name: "RETRO BIT",
    symbol: "$RBIT",
    price: 4.2,
    change: "+8.9%",
    mcap: "$4.2M",
    aiStatus: "working",
    type: "TOP",
  },
];

const initialAgents: Agent[] = [
  {
    id: "MINER-01",
    name: "MINER-01",
    role: "MINER",
    level: 3,
    status: "working",
    output: "⚡ +500/h",
    quote: "⚡ 能源产出 +500 | 库存充足",
  },
  {
    id: "SCOUT-99",
    name: "SCOUT-99",
    role: "SCOUT",
    level: 2,
    status: "working",
    output: "📰 +2/h",
    quote: "🔍 发现：某巨鲸地址 30 分钟内转入 $50M USDT",
  },
  {
    id: "ANALYST-X",
    name: "ANALYST-X",
    role: "ANALYST",
    level: 1,
    status: "resting",
    output: "📊 +5/h",
    quote: "📊 BTC 4H 分析：支撑位 $66,800，阻力 $68,500",
  },
  {
    id: "TRADER-7",
    name: "TRADER-7",
    role: "TRADER",
    level: 3,
    status: "working",
    output: "💰 +$1234",
    quote: "💰 成交：买入 0.5 ETH @ $3,450",
  },
];

export const useStore = create<StoreState>((set, get) => ({
  balances: { USDT: 14500, TAI: 5000 },
  totalAssets: 14500,
  maxAssets: 20000,
  holdings: [
    { tokenId: "0x123", amount: 150000, avgPrice: 1.0 },
    { tokenId: "0x456", amount: 85000, avgPrice: 0.9 },
  ],
  createdTokens: [],
  marketTokens: initialMarketTokens,
  aiAgents: initialAgents,
  liveFeed: [
    {
      id: 1,
      time: "10:42:01",
      text: "TRADER-7 💰 成交：买入 0.5 ETH @ $3,450",
      type: "trade",
    },
    {
      id: 2,
      time: "10:41:15",
      text: "SCOUT-99 🔍 发现：某巨鲸地址 30 分钟内转入 $50M USDT",
      type: "scout",
    },
    {
      id: 3,
      time: "10:39:50",
      text: "MINER-01 ⚡ 能源产出 +500 | 库存充足",
      type: "mine",
    },
    {
      id: 4,
      time: "10:35:22",
      text: "ANALYST-X 📊 BTC 4H 分析：支撑位 $66,800，阻力 $68,500",
      type: "analysis",
    },
  ],
  toasts: [],

  buyToken: (tokenId, amount, cost) => {
    const {
      balances,
      holdings,
      marketTokens,
      createdTokens,
      addToast,
      addFeedEvent,
    } = get();
    if (balances.USDT < cost) {
      addToast("USDT 余额不足 (INSUFFICIENT FUNDS)", "error");
      return;
    }

    const newBalances = { ...balances, USDT: balances.USDT - cost };
    const existingHolding = holdings.find((h) => h.tokenId === tokenId);
    let newHoldings;

    if (existingHolding) {
      newHoldings = holdings.map((h) =>
        h.tokenId === tokenId
          ? {
              ...h,
              amount: h.amount + amount,
              avgPrice: (h.amount * h.avgPrice + cost) / (h.amount + amount),
            }
          : h,
      );
    } else {
      newHoldings = [...holdings, { tokenId, amount, avgPrice: cost / amount }];
    }

    const token = [...marketTokens, ...createdTokens].find(
      (t) => t.id === tokenId,
    );

    set({ balances: newBalances, holdings: newHoldings });
    addToast(`成功买入 ${amount.toLocaleString()} ${token?.symbol}`, "success");
    addFeedEvent(
      `PLAYER_ONE 💰 成交：买入 ${amount.toLocaleString()} ${token?.symbol} @ $${(cost / amount).toFixed(3)}`,
      "trade",
    );
  },

  sellToken: (tokenId, amount, revenue) => {
    const {
      balances,
      holdings,
      marketTokens,
      createdTokens,
      addToast,
      addFeedEvent,
    } = get();
    const existingHolding = holdings.find((h) => h.tokenId === tokenId);

    if (!existingHolding || existingHolding.amount < amount) {
      addToast("持仓余额不足 (INSUFFICIENT BALANCE)", "error");
      return;
    }

    const newBalances = { ...balances, USDT: balances.USDT + revenue };
    let newHoldings = holdings
      .map((h) =>
        h.tokenId === tokenId ? { ...h, amount: h.amount - amount } : h,
      )
      .filter((h) => h.amount > 0);

    const token = [...marketTokens, ...createdTokens].find(
      (t) => t.id === tokenId,
    );

    set({ balances: newBalances, holdings: newHoldings });
    addToast(`成功卖出 ${amount.toLocaleString()} ${token?.symbol}`, "success");
    addFeedEvent(
      `PLAYER_ONE 💰 成交：卖出 ${amount.toLocaleString()} ${token?.symbol} @ $${(revenue / amount).toFixed(3)}`,
      "trade",
    );
  },

  launchToken: (tokenData, cost, hiredAgents) => {
    const { balances, createdTokens, aiAgents, addToast, addFeedEvent } = get();
    if (balances.TAI < cost) {
      addToast("TAI 余额不足 (INSUFFICIENT TAI)", "error");
      return;
    }

    const newToken: Token = {
      ...tokenData,
      id: `0x${Math.random().toString(16).slice(2, 8)}`,
      aiStats: { tweets: 0, replies: 0, newFollowers: 0 },
      strategy: "Aggressive Growth",
    };

    set({
      balances: { ...balances, TAI: balances.TAI - cost },
      createdTokens: [...createdTokens, newToken],
      aiAgents: [...aiAgents, ...hiredAgents],
    });

    addToast(`代币 ${newToken.symbol} 发射成功！`, "success");
    addFeedEvent(
      `🚀 新代币发射：${newToken.name} (${newToken.symbol}) 已上线！`,
      "launch",
    );
  },

  updateAgentStrategy: (tokenId, strategy) => {
    const { createdTokens, addToast } = get();
    const newTokens = createdTokens.map((t) =>
      t.id === tokenId ? { ...t, strategy } : t,
    );
    set({ createdTokens: newTokens });
    addToast(`已更新策略为：${strategy}`, "info");
  },

  addToast: (message, type = "info") => {
    const id = Math.random().toString(36).slice(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      get().removeToast(id);
    }, 3000);
  },

  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },

  addFeedEvent: (text, type) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
    set((state) => ({
      liveFeed: [{ id: Date.now(), time, text, type }, ...state.liveFeed].slice(
        0,
        50,
      ),
    }));
  },
}));
