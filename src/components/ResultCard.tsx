import { BranchOffice } from '../types';
import { exportToPDF, exportToExcel, copyToClipboard } from '../utils';
import { useState } from 'react';

interface ResultCardProps {
  office: BranchOffice;
}

const ContactActions = ({ mobile, color }: { mobile: string, color: 'blue' | 'emerald' | 'purple' }) => {
  if (!mobile || mobile.trim() === '') return null;
  const cleanNum = mobile.replace(/\D/g, '');
  const waNum = cleanNum.length === 10 ? '91' + cleanNum : cleanNum;

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50',
    emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-900/50'
  };

  return (
    <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800">
      <a href={`tel:${mobile}`} className={`flex-1 text-center py-2 text-[10px] font-bold rounded uppercase transition-colors flex items-center justify-center gap-1.5 ${colorClasses[color]}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        CALL
      </a>
      <a href={`https://wa.me/${waNum}`} target="_blank" rel="noopener noreferrer" title="Message on WhatsApp" className="flex-1 text-center py-2 bg-[#25D366]/15 text-[#075E54] dark:bg-[#25D366]/20 dark:text-[#5ce38a] text-[10px] font-bold rounded uppercase hover:bg-[#25D366]/25 dark:hover:bg-[#25D366]/30 transition-colors flex items-center justify-center gap-1.5">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WHATSAPP
      </a>
    </div>
  );
};

export function ResultCard({ office }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copyToClipboard(office)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col print-section grow">
      <div className="bg-slate-800 dark:bg-slate-950 text-white p-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="bg-red-600 text-white font-bold px-2 py-0.5 rounded text-xs shrink-0">SL NO: {office.slNo || 'N/A'}</span>
          <h2 className="text-2xl font-black uppercase tracking-tight">{office.name}</h2>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Office ID</p>
            <p className="font-mono font-bold text-yellow-400">{office.officeId || 'NA'}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">BO SOL ID</p>
            <p className="font-mono font-bold text-yellow-400">{office.solId || 'NA'}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-slate-100 dark:border-slate-800">
        {/* Column 1: BPM Details */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold shrink-0">BPM</div>
            <h3 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide">BPM Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Full Name</p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{office.bpmName || <span className="text-slate-400 italic font-medium">Not Assigned</span>}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Mobile Number</p>
              {office.bpmMobile ? (
                <div className="text-xl font-black text-blue-600 dark:text-blue-400">{office.bpmMobile}</div>
              ) : (
                <div className="text-xl font-black text-slate-300 dark:text-slate-700">--</div>
              )}
            </div>
            <ContactActions mobile={office.bpmMobile} color="blue" />
            <div className="pt-2 flex gap-2">
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold rounded uppercase">Active</span>
            </div>
          </div>
        </div>

        {/* Column 2: Delivery Staff */}
        <div className="p-6 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold shrink-0">DS</div>
            <h3 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide">Delivery Staff</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Staff Name</p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{office.deliveryStaffName || <span className="text-slate-400 italic font-medium">Not Assigned</span>}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Mobile Number</p>
              {office.deliveryMobile ? (
                <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">{office.deliveryMobile}</div>
              ) : (
                <div className="text-xl font-black text-slate-300 dark:text-slate-700">--</div>
              )}
            </div>
            <ContactActions mobile={office.deliveryMobile} color="emerald" />
          </div>
        </div>

        {/* Column 3: Mail Carrier */}
        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-purple-700 dark:text-purple-400 font-bold shrink-0">MC</div>
            <h3 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide">Mail Carrier</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Carrier Name</p>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{office.mailCarrierName || <span className="text-slate-400 italic font-medium">Not Assigned</span>}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Mobile Number</p>
              {office.mailCarrierMobile ? (
                <div className="text-xl font-black text-purple-600 dark:text-purple-400">{office.mailCarrierMobile}</div>
              ) : (
                <div className="text-xl font-black text-slate-300 dark:text-slate-700">--</div>
              )}
            </div>
            <ContactActions mobile={office.mailCarrierMobile} color="purple" />
          </div>
        </div>
      </div>

      {(office.digipin || office.latitude || office.longitude) && (
        <div className="bg-slate-50 dark:bg-slate-900/30 p-6 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-8 items-center">
          <div className="flex items-center gap-2 lg:border-r border-slate-200 dark:border-slate-700 lg:pr-8">
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-orange-700 dark:text-orange-400 tracking-tighter shrink-0"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
            <h3 className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-wide">Location<br/>Info</h3>
          </div>
          
          <div className="flex flex-wrap gap-8 flex-1">
            {office.digipin && (
               <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Digipin</p>
                  <p className="font-mono font-bold text-lg text-slate-900 dark:text-slate-100">{office.digipin}</p>
               </div>
            )}
            {office.latitude && (
               <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Latitude</p>
                  <p className="font-mono font-bold text-lg text-slate-900 dark:text-slate-100">{office.latitude}</p>
               </div>
            )}
            {office.longitude && (
               <div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-widest mb-1">Longitude</p>
                  <p className="font-mono font-bold text-lg text-slate-900 dark:text-slate-100">{office.longitude}</p>
               </div>
            )}
          </div>
          
          {(office.latitude && office.longitude) && (
            <div className="ml-auto w-full sm:w-auto">
              <a href={`https://www.google.com/maps/search/?api=1&query=${office.latitude},${office.longitude}`} target="_blank" rel="noopener noreferrer" className="px-4 py-3 sm:py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-bold uppercase hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center justify-center gap-2 w-full">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>
                VIEW ON MAPS
              </a>
            </div>
          )}
        </div>
      )}

      {/* Action Footer for Card */}
      <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 flex flex-wrap gap-4 justify-between items-center border-t border-slate-200 dark:border-slate-800 no-print">
        <div className="flex flex-wrap gap-3">
          <button onClick={handleCopy} className="px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded text-xs font-bold flex items-center gap-2 uppercase hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors">
            📋 {copied ? 'COPIED!' : 'COPY DETAILS'}
          </button>
          <button onClick={handlePrint} className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded text-xs font-bold flex items-center gap-2 uppercase hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            🖨️ PRINT
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => exportToPDF(office)} className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs font-bold uppercase hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
            📄 EXPORT PDF
          </button>
          <button onClick={() => exportToExcel(office)} className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-bold uppercase hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
            📊 EXPORT EXCEL
          </button>
        </div>
      </div>
    </div>
  );
}
