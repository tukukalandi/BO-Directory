import Papa from 'papaparse';
import { BranchOffice, SyncResult } from './types';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1oJCKMDVJdnbO4rdUXB1jCxKvIJrC3wbSzl-65E8rEhs/export?format=csv&gid=642131382';
const STORAGE_KEY = 'bo_directory_data';
const SYNC_TIME_KEY = 'bo_directory_last_sync';

export async function fetchSheetData(): Promise<SyncResult & { data?: BranchOffice[], syncTime?: number }> {
  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    
    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data: BranchOffice[] = results.data
            .filter((row: any) => row['Name of the Branch Post Office'] || row['Office ID'])
            .map((row: any) => ({
              slNo: String(row['Sl No'] || '').trim(),
              name: String(row['Name of the Branch Post Office'] || '').trim(),
              officeId: String(row['Office ID'] || '').trim(),
              solId: String(row['BO Sol ID'] || '').trim(),
              bpmName: String(row['Name of the BPM'] || '').trim(),
              bpmMobile: String(row['Mobile Number of the BPM'] || '').trim(),
              deliveryStaffName: String(row['Name of the Delivery Staff'] || '').trim(),
              deliveryMobile: String(row['Mobile Number of the Delivery Staff'] || '').trim(),
              mailCarrierName: String(row['Name of the Mail Carrier'] || '').trim(),
              mailCarrierMobile: String(row['Mobile Number of the Mail carrier'] || '').trim(),
            }));
          
          const now = Date.now();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          localStorage.setItem(SYNC_TIME_KEY, now.toString());
          
          resolve({
            success: true,
            message: `Successfully synced ${data.length} records.`,
            count: data.length,
            data,
            syncTime: now
          });
        },
        error: (error: any) => {
          resolve({ success: false, message: `Failed to parse data: ${error.message}` });
        }
      });
    });
  } catch (error: any) {
    return { success: false, message: `Failed to fetch data: ${error.message}` };
  }
}

export function loadLocalData(): { data: BranchOffice[]; syncTime: number | null } {
  try {
    const dataStr = localStorage.getItem(STORAGE_KEY);
    const syncTimeStr = localStorage.getItem(SYNC_TIME_KEY);
    
    if (dataStr) {
      return {
        data: JSON.parse(dataStr),
        syncTime: syncTimeStr ? parseInt(syncTimeStr, 10) : null
      };
    }
  } catch (e) {
    console.error("Failed to load local data", e);
  }
  return { data: [], syncTime: null };
}

export function exportToPDF(office: BranchOffice) {
  const doc = new jsPDF();
  
  doc.setFontSize(18);
  doc.setTextColor(220, 38, 38); // Red color for header
  doc.text('Branch Post Office Details', 14, 20);
  
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(office.name, 14, 30);
  
  const body = [
    ['Office ID', office.officeId],
    ['BO Sol ID', office.solId],
    ['BPM Name', office.bpmName],
    ['BPM Mobile', office.bpmMobile],
    ['Delivery Staff', office.deliveryStaffName],
    ['Delivery Mobile', office.deliveryMobile],
    ['Mail Carrier', office.mailCarrierName],
    ['Mail Carrier Mobile', office.mailCarrierMobile],
  ];

  autoTable(doc, {
    startY: 35,
    head: [['Field', 'Details']],
    body: body,
    theme: 'grid',
    headStyles: { fillColor: [220, 38, 38] }, // Red header
  });

  doc.save(`${office.name.replace(/\s+/g, '_')}_Details.pdf`);
}

export function exportToExcel(office: BranchOffice) {
  const wsData = [
    ['Field', 'Details'],
    ['Branch Post Office Name', office.name],
    ['Office ID', office.officeId],
    ['BO Sol ID', office.solId],
    ['BPM Name', office.bpmName],
    ['BPM Mobile', office.bpmMobile],
    ['Delivery Staff Name', office.deliveryStaffName],
    ['Delivery Staff Mobile', office.deliveryMobile],
    ['Mail Carrier Name', office.mailCarrierName],
    ['Mail Carrier Mobile', office.mailCarrierMobile],
  ];
  
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Office Details');
  
  XLSX.writeFile(wb, `${office.name.replace(/\s+/g, '_')}_Details.xlsx`);
}

export function copyToClipboard(office: BranchOffice): boolean {
  const text = `Branch Post Office Details:
Name: ${office.name}
Office ID: ${office.officeId}
BO Sol ID: ${office.solId}

BPM Details:
Name: ${office.bpmName || 'N/A'}
Mobile: ${office.bpmMobile || 'N/A'}

Delivery Staff Details:
Name: ${office.deliveryStaffName || 'N/A'}
Mobile: ${office.deliveryMobile || 'N/A'}

Mail Carrier Details:
Name: ${office.mailCarrierName || 'N/A'}
Mobile: ${office.mailCarrierMobile || 'N/A'}`;

  try {
    navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy', err);
    return false;
  }
}
