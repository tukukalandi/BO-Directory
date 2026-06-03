import { RefreshCw, Moon, Sun, FileEdit } from 'lucide-react';
import { BranchOffice } from '../types';

interface HeaderProps {
  onSync: () => void;
  isSyncing: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Header({ onSync, isSyncing, theme, toggleTheme }: HeaderProps) {
  return (
    <header className="bg-red-700 border-b border-red-800 text-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md gap-4 sm:gap-0 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="bg-white p-1 rounded-sm shrink-0">
          <svg className="w-8 h-8 text-red-700" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase leading-tight">BO Directory Search Tool</h1>
          <p className="text-[10px] opacity-80 uppercase font-semibold">Department of Posts • Regional Administration</p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
        <a
          href="https://docs.google.com/spreadsheets/d/1oJCKMDVJdnbO4rdUXB1jCxKvIJrC3wbSzl-65E8rEhs/edit?gid=642131382#gid=642131382"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-800 text-white px-4 py-2 rounded border border-red-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-900 transition-colors shadow-sm flex-1 sm:flex-none"
          title="Edit Data in Google Sheets"
        >
          <FileEdit size={16} />
          <span className="hidden sm:inline">EDIT SHEET</span>
        </a>
        <button
          onClick={onSync}
          disabled={isSyncing}
          className={`bg-white text-red-700 px-4 py-2 rounded border border-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors shadow-sm flex-1 sm:flex-none ${
            isSyncing ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          <RefreshCw size={16} className={`${isSyncing ? 'animate-spin' : ''}`} />
          <span>SYNC DATA</span>
        </button>
        <button
          onClick={toggleTheme}
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-red-800 border border-red-600 hover:bg-red-900 transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
        </button>
      </div>
    </header>
  );
}
