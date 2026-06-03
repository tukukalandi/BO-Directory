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
}

export interface SyncResult {
  success: boolean;
  message: string;
  count?: number;
}
