import { format } from 'date-fns';
import { BranchOffice } from '../types';

interface DashboardStatsProps {
  data: BranchOffice[];
  lastSync: number | null;
}

export function DashboardStats({ data, lastSync }: DashboardStatsProps) {
  const totalOffices = data.length;
  const totalBPMs = data.filter(d => d.bpmName).length;
  const totalDeliveryStaff = data.filter(d => d.deliveryStaffName).length;
  const totalMailCarriers = data.filter(d => d.mailCarrierName).length;

  const statCards = [
    { label: 'Branch Offices', value: totalOffices, borderColor: 'border-l-blue-600' },
    { label: 'Total BPMs', value: totalBPMs, borderColor: 'border-l-emerald-600' },
    { label: 'Delivery Staff', value: totalDeliveryStaff, borderColor: 'border-l-amber-500' },
    { label: 'Mail Carriers', value: totalMailCarriers, borderColor: 'border-l-purple-600' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 shadow-sm rounded-lg">
      {statCards.map((stat, i) => (
        <div key={i} className={`bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700 border-l-4 ${stat.borderColor}`}>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">{stat.label}</p>
          <p className="text-2xl font-black text-slate-800 dark:text-white leading-tight mt-1">{stat.value}</p>
        </div>
      ))}
      <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded border border-green-200 dark:border-green-800 border-l-4 border-l-green-600 col-span-2 lg:col-span-1">
        <p className="text-[10px] text-green-700 dark:text-green-500 uppercase font-bold tracking-wider">Data Status</p>
        <p className="text-sm font-bold text-green-800 dark:text-green-400 mt-1">✅ CACHED & READY</p>
        {lastSync && (
          <p className="text-[10px] text-green-600 dark:text-green-500/80 mt-1 uppercase font-semibold">
            Sync: {format(new Date(lastSync), 'dd MMM, hh:mm a')}
          </p>
        )}
      </div>
    </div>
  );
}
