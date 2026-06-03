import { useState, useEffect, useMemo, MouseEvent } from 'react';
import { BranchOffice } from './types';
import { fetchSheetData, loadLocalData } from './utils';
import { Header } from './components/Header';
import { DashboardStats } from './components/DashboardStats';
import { SearchControls } from './components/SearchControls';
import { ResultCard } from './components/ResultCard';

export default function App() {
  const [data, setData] = useState<BranchOffice[]>([]);
  const [lastSync, setLastSync] = useState<number | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const handleSync = async (silent: boolean | MouseEvent = false) => {
    const isSilent = typeof silent === 'boolean' ? silent : false;
    if (!isSilent) setIsSyncing(true);
    const result = await fetchSheetData();
    if (!isSilent) setIsSyncing(false);
    
    if (result.success && result.data) {
      setData(result.data);
      if (result.syncTime) setLastSync(result.syncTime);
      if (!isSilent) showToast(result.message, 'success');
      
      // Auto select if currently selected ID is now missing (e.g. data changed)
      if (selectedOfficeId && !result.data.find(d => d.slNo === selectedOfficeId)) {
        setSelectedOfficeId('');
      }
    } else {
      if (!isSilent) showToast(result.message, 'error');
    }
  };

  useEffect(() => {
    // Load cached data
    const { data: localData, syncTime } = loadLocalData();
    if (localData && localData.length > 0) {
      setData(localData);
      setLastSync(syncTime);
    }
    
    // Auto-sync in the background every time app loads to fetch latest Google Sheet data
    handleSync(true);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter(office => {
      return (
        office.name.toLowerCase().includes(lowerQuery) ||
        office.officeId.toLowerCase().includes(lowerQuery) ||
        office.solId.toLowerCase().includes(lowerQuery) ||
        office.bpmName.toLowerCase().includes(lowerQuery)
      );
    });
  }, [data, searchQuery]);

  const selectedOffice = useMemo(() => {
    if (!selectedOfficeId) return null;
    return data.find(o => o.slNo === selectedOfficeId) || null;
  }, [selectedOfficeId, data]);

  // If search query changes and doesn't match the selected office, we might want to clear selection
  // but better UX is to just handle the filtered dropdown properly.
  // Actually, if we type a search and the currently selected office is NOT in filteredData, 
  // maybe we deselect? Let's leave selection until we explicitly choose from dropdown, but if 
  // it's no longer in the filtered list, we could clear it. 
  useEffect(() => {
    if (selectedOfficeId && !filteredData.find(o => o.slNo === selectedOfficeId)) {
      setSelectedOfficeId('');
    }
  }, [filteredData, selectedOfficeId]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans flex flex-col">
      <Header 
        onSync={handleSync} 
        isSyncing={isSyncing} 
        theme={theme}
        toggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
      />

      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        {toast && (
          <div className={`mb-2 p-4 rounded-xl flex items-center ${toast.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
            {toast.message}
          </div>
        )}

        {data.length > 0 ? (
          <>
            <DashboardStats data={data} lastSync={lastSync} />
            
            <div className="flex flex-col gap-6">
              <div className="print-section-hide">
                <SearchControls 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedOfficeId={selectedOfficeId}
                  setSelectedOfficeId={setSelectedOfficeId}
                  data={data}
                  filteredData={filteredData}
                />
              </div>

              <div className="flex-1 flex flex-col">
                {selectedOffice ? (
                  <ResultCard office={selectedOffice} />
                ) : (
                  <div className="bg-white dark:bg-slate-800 border-[2px] border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No Office Selected</h3>
                    <p>Search and select an office from the dropdown to view details.</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            {isSyncing ? (
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500">Fetching directory data...</p>
              </div>
            ) : (
              <div>
                <p className="text-slate-500 mb-6">No data found. Please sync the directory to get started.</p>
                <button
                  onClick={handleSync}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Sync Now
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <style>{`
        @media print {
          body {
            background-color: white !important;
          }
          .dark body {
            background-color: white !important;
            color: black !important;
          }
           /* Hide header, stats, search controls, and 'print-section-hide' elements */
          header, .print-section-hide, .no-print, .mb-8 > div:first-child {
            display: none !important;
          }
          /* Ensure result card uses full width */
          .print-section {
            width: 100% !important;
            box-shadow: none !important;
            border: 1px solid #ddd !important;
          }
          /* Reset gradient in print to show red header background properly via webkit prints */
          .bg-gradient-to-r {
            background: #dc2626 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
