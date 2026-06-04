export interface BranchOffice {
  slNo: string;
  name: string;
  officeId: string;
  solId: string;
  bpmName: string;
  bpmMobile: string;
  deliveryStaffName: string;
  deliveryMobile: string;
  mailCarrierName: string;
  mailCarrierMobile: string;
  digipin?: string;
  longitude?: string;
  latitude?: string;
}

export interface SyncResult {
  success: boolean;
  message: string;
  count?: number;
}
