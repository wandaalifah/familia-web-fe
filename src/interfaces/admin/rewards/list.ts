export interface IGetListCouponsQuery {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  search_by?: string;
  search?: string;
}

interface CouponItem {
  id: string;
  title: string;
  description: string | null;
  points_cost: number;
  created_at: Date;
  updated_at: Date;
}

export interface ICouponItem extends CouponItem {}
