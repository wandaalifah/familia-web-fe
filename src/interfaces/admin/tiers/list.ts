export interface IGetListTiersQuery {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  search_by?: string;
  search?: string;
}

interface TierItem {
  id: string;
  name: string;
  description: string | null;
  level: number;
  required_points: number;
  created_at: Date;
  updated_at: Date;
}

export interface ITierItem extends TierItem {}
