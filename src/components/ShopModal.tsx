import React, { useState } from 'react';
import { ShoppingBag, Coins, Sparkles, Check, Heart, Shield, Zap, Crown, User } from 'lucide-react';
import { ShopItem, UserStats } from '../types';
import { SHOP_ITEMS } from '../data/coursesData';

interface ShopModalProps {
  stats: UserStats;
  onBuy: (item: ShopItem) => void;
  onSelectAvatar: (avatar: string) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ stats, onBuy, onSelectAvatar }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'avatar' | 'powerup' | 'title'>('all');

  const filteredItems = SHOP_ITEMS.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4">
      {/* Shop Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 p-6 mb-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              Mercado do Código
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              DevShop de Recompensas
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Gaste suas moedas ganhas nas lições para customizar seu herói e desbloquear vantagens.
            </p>
          </div>

          {/* Current Balance */}
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Saldo Atual</div>
              <div className="text-xl font-black text-amber-400 font-mono">
                {stats.coins} <span className="text-xs font-sans text-amber-300">DevCoins</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'Todos os Itens' },
          { id: 'avatar', label: 'Avatares Místicos' },
          { id: 'powerup', label: 'Poções & Vantagens' },
          { id: 'title', label: 'Títulos Lendários' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as 'all' | 'avatar' | 'powerup' | 'title')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isOwned = stats.inventory.includes(item.id);
          const isEquippedAvatar = item.category === 'avatar' && stats.selectedAvatar === item.value;
          const isEquippedTitle = item.category === 'title' && stats.selectedTitle === item.value;
          const canAfford = stats.coins >= item.price;

          return (
            <div
              key={item.id}
              className="flex flex-col justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all shadow-md"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-3xl shadow-inner">
                    {item.category === 'avatar' ? item.value : item.icon === 'Heart' ? '💖' : item.icon === 'Shield' ? '🛡️' : item.icon === 'Crown' ? '👑' : '⚡'}
                  </div>

                  <div className="flex items-center gap-1 text-sm font-extrabold text-amber-400 font-mono">
                    <Coins className="w-4 h-4" />
                    <span>{item.price}</span>
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-slate-100 mb-1">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {/* Action Button */}
              <div>
                {isOwned && item.category === 'avatar' ? (
                  <button
                    onClick={() => onSelectAvatar(item.value)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isEquippedAvatar
                        ? 'bg-emerald-950/60 border border-emerald-500/60 text-emerald-300'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                  >
                    {isEquippedAvatar ? '✓ Avatar em Uso' : 'Equipar Avatar'}
                  </button>
                ) : isOwned && item.category === 'title' ? (
                  <div className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 text-center text-xs font-bold text-slate-400">
                    {isEquippedTitle ? '✓ Título Ativo' : 'Adquirido'}
                  </div>
                ) : (
                  <button
                    onClick={() => onBuy(item)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      canAfford
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{canAfford ? 'Comprar Item' : 'Moedas Insuficientes'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
