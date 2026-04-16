import { useStore } from '../store';
import { Sparkles, LayoutGrid, Briefcase, Clock } from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab, address, balance } = useStore();

  const tabs = [
    { id: 'scanner' as const, icon: LayoutGrid, label: 'Scanner' },
    { id: 'portfolio' as const, icon: Briefcase, label: 'Portfolio' },
    { id: 'history' as const, icon: Clock, label: 'History' }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-morpheye" />
            <div>
              <h1 className="text-2xl font-bold gradient-text">Morpheye</h1>
              <p className="text-xs text-gray-500">Prediction Market Terminal</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="glass rounded-lg px-4 py-2">
              <div className="text-xs text-gray-400">Balance</div>
              <div className="text-xl font-bold">${balance.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex gap-2">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-morpheye text-morpheye'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
