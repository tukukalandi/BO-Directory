import { RefreshCw, Moon, Sun, FileEdit, X } from 'lucide-react';
import { BranchOffice } from '../types';
import { useState, MouseEvent, FormEvent } from 'react';

interface HeaderProps {
  onSync: () => void;
  isSyncing: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Header({ onSync, isSyncing, theme, toggleTheme }: HeaderProps) {
  const [showLogin, setShowLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleEditClick = (e: MouseEvent) => {
    e.preventDefault();
    setShowLogin(true);
    setUserId('');
    setPassword('');
    setLoginError('');
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userId === '10166284' && password === 'Dop@1234') {
      window.open('https://docs.google.com/spreadsheets/d/1oJCKMDVJdnbO4rdUXB1jCxKvIJrC3wbSzl-65E8rEhs/edit?gid=642131382#gid=642131382', '_blank');
      setShowLogin(false);
    } else {
      setLoginError('Invalid User ID or Password.');
    }
  };

  return (
    <>
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
          <button
            onClick={handleEditClick}
            className="bg-red-800 text-white px-4 py-2 rounded border border-red-600 font-bold text-sm flex items-center justify-center gap-2 hover:bg-red-900 transition-colors shadow-sm flex-1 sm:flex-none"
            title="Edit Data in Google Sheets"
          >
            <FileEdit size={16} />
            <span className="hidden sm:inline">EDIT SHEET</span>
          </button>
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

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="bg-red-700 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Authentication Required</h3>
              <button 
                onClick={() => setShowLogin(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleLoginSubmit} className="p-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                Please enter your credentials to access and edit the directory data sheet.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    required
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-medium text-slate-900 dark:text-white transition-all"
                    placeholder="Enter your User ID"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 font-medium text-slate-900 dark:text-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {loginError && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg border border-red-100 dark:border-red-900/50">
                  {loginError}
                </div>
              )}

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-bold text-sm uppercase hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-bold text-sm uppercase hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  Confirm & Edit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
