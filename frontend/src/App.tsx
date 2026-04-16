import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { MarketCard } from './components/MarketCard';
import { TradeModal } from './components/TradeModal';
import { api } from './lib/api';
import { useStore } from './store';
import type { Market } from './types';

export default function App() {
  const { activeTab, address, balance, setAddress } = useStore();
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [tradeSide, setTradeSide] = useState<'Yes' | 'No'>('Yes');

  // Fetch markets
  const { data: marketsData, isLoading } = useQuery({
    queryKey: ['markets'],
    queryFn: () => api.getMarkets(30),
    refetchInterval: 30000
  });

  // Fetch user data
  const { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ['user', address],
    queryFn: () => api.getUser(address)
  });

  // Update store with user data
  if (userData?.balance) {
    setAddress(address);
  }

  const markets = marketsData?.markets || [];

  const handleTrade = (market: Market, side: 'Yes' | 'No') => {
    setSelectedMarket(market);
    setTradeSide(side);
  };

  return (
    <Layout>
      {activeTab === 'scanner' && (
        <>
          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-morpheye border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Loading markets...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {markets.map((market: Market) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  onTrade={(side) => handleTrade(market, side)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'portfolio' && (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Your Positions</h2>
          {userData?.positions?.length ? (
            <div className="space-y-4">
              {userData.positions.map((pos: any) => (
                <div key={pos.id} className="glass rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{pos.market_question}</h3>
                      <p className="text-sm text-gray-400">
                        {pos.side} @ {(pos.entry_price * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">${pos.size}</div>
                      <div className={pos.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                        {pos.pnl >= 0 ? '+' : ''}{pos.pnl?.toFixed(2) || '0.00'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              No positions yet. Trade from the Scanner!
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="text-center py-20 text-gray-400">
          Trade history coming soon...
        </div>
      )}

      <AnimatePresence>
        {selectedMarket && (
          <TradeModal
            market={selectedMarket}
            side={tradeSide}
            onClose={() => setSelectedMarket(null)}
            onSuccess={() => refetchUser()}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
