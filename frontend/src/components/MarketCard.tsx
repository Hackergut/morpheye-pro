import { motion } from 'framer-motion';
import { Market } from '../types';

interface Props {
  market: Market;
  onTrade: (side: 'Yes' | 'No', price: number) => void;
}

export function MarketCard({ market, onTrade }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 hover:border-morpheye/50 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-semibold px-3 py-1 bg-morpheye/20 text-morpheye rounded-full">
          {market.category}
        </span>
        <span className="text-xs text-gray-500">
          ${(market.volume / 1e6).toFixed(1)}M vol
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-6 leading-tight">{market.question}</h3>

      <div className="space-y-3 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-emerald-400 font-semibold">YES</span>
            <span>{market.yes_price.toFixed(1)}%</span>
          </div>
          <div className="h-8 bg-gray-800 rounded overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${market.yes_price}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-red-400 font-semibold">NO</span>
            <span>{market.no_price.toFixed(1)}%</span>
          </div>
          <div className="h-8 bg-gray-800 rounded overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${market.no_price}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-red-600 to-red-400"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onTrade('Yes', market.yes_price / 100)}
          className="py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-semibold transition-colors"
        >
          BUY YES
        </button>
        <button
          onClick={() => onTrade('No', market.no_price / 100)}
          className="py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition-colors"
        >
          BUY NO
        </button>
      </div>
    </motion.div>
  );
}
