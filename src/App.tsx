import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, Trophy, Swords, Zap, Shield, Coins, Activity, Skull, Star } from 'lucide-react';

// Mock Data
const agents = [
  { id: 1, name: 'NEO-X7', role: 'Arbitrage Bot', apy: '124.5%', status: 'ACTIVE', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=NEO-X7&backgroundColor=000000' },
  { id: 2, name: 'ZION-99', role: 'Yield Farmer', apy: '89.2%', status: 'FARMING', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=ZION-99&backgroundColor=000000' },
  { id: 3, name: 'TRINITY', role: 'Sniper', apy: '210.8%', status: 'WAITING', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=TRINITY&backgroundColor=000000' },
  { id: 4, name: 'MORPHEUS', role: 'Market Maker', apy: '45.1%', status: 'ACTIVE', avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=MORPHEUS&backgroundColor=000000' },
];

const leaderboard = [
  { rank: 1, player: '0xDragon', score: 99999, title: '大宗师 (Grandmaster)' },
  { rank: 2, player: 'PixelNinja', score: 85420, title: '宗师 (Master)' },
  { rank: 3, player: 'CryptoSamurai', score: 72100, title: '大师 (Expert)' },
  { rank: 4, player: 'Satoshi_Bot', score: 65000, title: '钻石 (Diamond)' },
  { rank: 5, player: 'Vitalik_Fan', score: 54320, title: '白金 (Platinum)' },
];

const achievements = [
  { id: 1, name: 'FIRST BLOOD', desc: 'First profitable trade', icon: <Swords className="w-6 h-6" />, unlocked: true },
  { id: 2, name: 'WHALE HUNTER', desc: 'Liquidate a whale', icon: <Skull className="w-6 h-6" />, unlocked: true },
  { id: 3, name: 'DIAMOND HANDS', desc: 'Hold through -50% dip', icon: <Shield className="w-6 h-6" />, unlocked: false },
  { id: 4, name: 'HIGH ROLLER', desc: 'Volume > $1M', icon: <Star className="w-6 h-6" />, unlocked: false },
];

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#00FF41] font-vt crt relative selection:bg-[#00FF41] selection:text-black">
      {/* Top Bar / Ticker */}
      <div className="h-8 border-b-4 border-[#00FF41] flex items-center px-4 bg-[#111] overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex gap-12 text-xl">
          <span>SYS.STATUS: ONLINE</span>
          <span>BTC: $64,230 <span className="text-[#00FF41]">+5.2%</span></span>
          <span>ETH: $3,450 <span className="text-[#00FF41]">+2.1%</span></span>
          <span>SOL: $145 <span className="text-red-500">-1.4%</span></span>
          <span>AGENT_NETWORK: 1,337 ACTIVE</span>
          <span>NEXT_EPOCH: 04:20:00</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-2rem)] p-4 gap-4 max-w-[1920px] mx-auto">
        
        {/* Sidebar / HUD */}
        <div className="w-full lg:w-80 flex flex-col gap-4">
          {/* Player Profile */}
          <div className="border-4 border-[#00FF41] bg-[#111] p-4 pixel-corners glow-box">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 border-2 border-[#00FF41] p-1 bg-black">
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Player1&backgroundColor=000000" alt="Avatar" className="w-full h-full" />
              </div>
              <div>
                <h2 className="font-pixel text-[10px] glow-text leading-tight mb-1">PLAYER_ONE</h2>
                <p className="text-lg text-[#FFD700]">LVL 42: 赛博朋克</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>HP (BALANCE)</span>
                  <span>14,500 / 20,000</span>
                </div>
                <div className="h-4 border-2 border-[#00FF41] bg-black p-[2px]">
                  <div className="h-full health-bar-fill w-[72%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-[#FFD700]">
                  <span>EXP (YIELD)</span>
                  <span>8,400 / 10,000</span>
                </div>
                <div className="h-4 border-2 border-[#FFD700] bg-black p-[2px]">
                  <div className="h-full exp-bar-fill w-[84%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="border-4 border-[#00FF41] bg-[#111] p-4 flex-1 pixel-corners glow-box flex flex-col">
            <h3 className="font-pixel text-[10px] mb-4 text-[#FFD700] border-b-2 border-[#FFD700] pb-2">COMMAND_CENTER</h3>
            <nav className="flex flex-col gap-2 text-xl">
              <button className="flex items-center gap-2 hover:bg-[#00FF41] hover:text-black p-2 transition-colors text-left group">
                <Terminal className="w-5 h-5 group-hover:animate-pulse" />
                <span>[1] DASHBOARD</span>
              </button>
              <button className="flex items-center gap-2 hover:bg-[#00FF41] hover:text-black p-2 transition-colors text-left group">
                <Cpu className="w-5 h-5 group-hover:animate-pulse" />
                <span>[2] AGENTS</span>
              </button>
              <button className="flex items-center gap-2 hover:bg-[#00FF41] hover:text-black p-2 transition-colors text-left group">
                <Swords className="w-5 h-5 group-hover:animate-pulse" />
                <span>[3] BATTLE_ARENA</span>
              </button>
              <button className="flex items-center gap-2 hover:bg-[#00FF41] hover:text-black p-2 transition-colors text-left group">
                <Coins className="w-5 h-5 group-hover:animate-pulse" />
                <span>[4] VAULT</span>
              </button>
            </nav>

            <div className="mt-auto pt-4 border-t-2 border-[#00FF41] text-sm">
              <p>SYS_TIME: {time.toLocaleTimeString()}</p>
              <p className="blink">_AWAITING_INPUT...</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          
          {/* Progress Bar - 18 Rounds */}
          <div className="border-4 border-[#00FF41] bg-[#111] p-4 pixel-corners glow-box shrink-0">
            <div className="flex justify-between items-end mb-2">
              <h3 className="font-pixel text-[10px] text-[#FFD700]">CAMPAIGN_PROGRESS</h3>
              <span className="text-xl">ROUND 7 / 18</span>
            </div>
            <div className="flex gap-1 h-8">
              {Array.from({ length: 18 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`flex-1 border-2 ${
                    i < 7 ? 'bg-[#00FF41] border-[#00FF41]' : 
                    i === 7 ? 'bg-[#FFD700] border-[#FFD700] animate-pulse' : 
                    'bg-black border-[#00FF41]/30'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 flex-1 min-h-0">
            {/* Left Column: Agents */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
              <h3 className="font-pixel text-[10px] flex items-center gap-2 shrink-0">
                <Activity className="w-4 h-4" /> ACTIVE_AGENTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.map((agent) => (
                  <motion.div 
                    key={agent.id}
                    whileHover={{ scale: 1.02 }}
                    className="border-4 border-[#00FF41] bg-[#111] p-3 pixel-corners glow-box relative overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute top-0 right-0 bg-[#00FF41] text-black text-xs font-pixel px-2 py-1 z-10">
                      {agent.status}
                    </div>
                    <div className="flex gap-4">
                      <div className="w-20 h-20 border-2 border-[#00FF41] bg-black p-1 shrink-0">
                        <img src={agent.avatar} alt={agent.name} className="w-full h-full" />
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-pixel text-[10px] text-[#FFD700] mb-1">{agent.name}</h4>
                          <p className="text-lg opacity-80 leading-none">{agent.role}</p>
                        </div>
                        <div className="text-xl">
                          APY: <span className="text-[#00FF41]">{agent.apy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t-2 border-[#00FF41]/30 flex justify-between items-center">
                      <span className="text-sm">PWR: {Math.floor(Math.random() * 9000 + 1000)}</span>
                      <button className="text-black bg-[#00FF41] px-2 py-1 text-sm hover:bg-[#FFD700] transition-colors font-pixel text-[8px]">
                        UPGRADE
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Column: Leaderboard & Achievements */}
            <div className="w-full xl:w-96 flex flex-col gap-4 shrink-0">
              
              {/* Leaderboard */}
              <div className="border-4 border-[#FFD700] bg-[#111] p-4 pixel-corners glow-box-gold flex-1 flex flex-col min-h-[300px]">
                <h3 className="font-pixel text-[10px] text-[#FFD700] mb-4 flex items-center gap-2 shrink-0">
                  <Trophy className="w-4 h-4" /> GLOBAL_RANKING
                </h3>
                <div className="flex flex-col gap-2 overflow-y-auto pr-2">
                  {leaderboard.map((player, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-2 border-b-2 border-[#FFD700]/20 ${idx === 0 ? 'bg-[#FFD700]/10' : ''}`}>
                      <div className="flex items-center gap-3">
                        <span className={`font-pixel text-sm ${idx === 0 ? 'text-[#FFD700]' : idx === 1 ? 'text-gray-300' : idx === 2 ? 'text-amber-600' : ''}`}>
                          #{player.rank}
                        </span>
                        <div>
                          <div className="text-xl leading-tight">{player.player}</div>
                          <div className="text-sm text-[#FFD700] leading-tight">{player.title}</div>
                        </div>
                      </div>
                      <div className="font-pixel text-[10px] text-[#00FF41]">
                        {player.score.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="border-4 border-[#00FF41] bg-[#111] p-4 pixel-corners glow-box h-64 flex flex-col shrink-0">
                <h3 className="font-pixel text-[10px] mb-4 flex items-center gap-2 shrink-0">
                  <Zap className="w-4 h-4" /> ACHIEVEMENTS
                </h3>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-2">
                  {achievements.map((ach) => (
                    <div 
                      key={ach.id} 
                      className={`border-2 p-2 flex flex-col items-center text-center gap-1 ${
                        ach.unlocked 
                          ? 'border-[#FFD700] bg-[#FFD700]/10 text-[#FFD700]' 
                          : 'border-[#00FF41]/30 text-[#00FF41]/50 grayscale'
                      }`}
                    >
                      <div className="mb-1">{ach.icon}</div>
                      <div className="text-sm leading-tight">{ach.name}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
