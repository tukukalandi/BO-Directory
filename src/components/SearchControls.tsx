import { BranchOffice } from '../types';

interface SearchControlsProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedOfficeId: string;
  setSelectedOfficeId: (id: string) => void;
  data: BranchOffice[];
  filteredData: BranchOffice[];
}

export function SearchControls({ 
  searchQuery, 
  setSearchQuery, 
  selectedOfficeId, 
  setSelectedOfficeId,
  filteredData
}: SearchControlsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">🔍</span>
        <input
          type="text"
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          placeholder="Search by Office Name, ID, Sol ID, or BPM Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
          >
            ❌
          </button>
        )}
      </div>
      <div className="w-full md:w-96 flex gap-2">
        <div className="relative flex-1">
          <select
            value={selectedOfficeId}
            onChange={(e) => setSelectedOfficeId(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-700 dark:text-slate-200 font-medium"
          >
            <option value="">Select Office Branch...</option>
            {filteredData.map(office => (
              <option key={office.slNo} value={office.slNo}>
                {office.name} {office.officeId ? `(${office.officeId})` : ''}
              </option>
            ))}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▼</span>
        </div>
        <button 
          onClick={() => {
            setSearchQuery('');
            setSelectedOfficeId('');
          }}
          className="px-4 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg font-bold text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors uppercase shrink-0"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
