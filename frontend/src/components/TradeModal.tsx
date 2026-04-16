import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Market } from '../types';
import { api } from '../lib/api';
import { useStore } from '../store';

interface Props {
  market: Market;
  side: 'Yes' | 'No';
  onClose: () => void;
  onSuccess: () => void;
}

export function TradeModal({ market, side, onClose, onSuccess }: Props) {
  const [size, setSize] = useState(100);
  const [loading, setLoading] = useState(false);
  const { address } = useStore();

  const price = side === 'Yes' ? market.yes_price : market.no_price;

  const handleTrade = async () => {
    setLoading(true);
    try {
      await api.openTrade({
        user_address: address,
        market_id: market.id,
        market_question: market.question,
        side,
        price: price / 100,
        size
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Trade failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass rounded-2xl p-8 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Buy {side}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-gray-400 mb-6 text-sm">{market.question}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Amount ($)</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-xl font-semibold"
              max={10000}
            />
          </div>

          <div className="glass rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Price</span>
              <span className="font-semibold">{price.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Potential Return</span>
              <span className="font-semibold text-emerald-400">
                ${(size / (price / 100)).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleTrade}
            disabled={loading}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-colors ${
              side === 'Yes'
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-red-600 hover:bg-red-500'
            } disabled:opacity-50`}
          >
            {loading ? 'Processing...' : `Buy ${side} - $${size}`}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
