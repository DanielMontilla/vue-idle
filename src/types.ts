export interface TabLabelData {
   title: string;
   onColor: string;
   offColor: string;
}
export type Tab = { label: TabLabelData };

export interface PlayerStats {
   strength: number;
   strengthXP: number;
}
