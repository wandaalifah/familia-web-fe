export interface IGetListCouponQuery {
  page: number;
  limit: number;
  sort_by?: "created_at" | "title" | "points_cost";
  sort_order?: "asc" | "desc";
  search_by?: "title" | "description";
  search?: string;
}

// Note: the real GET /admin/reward/redemptions endpoint has no date-range
// query param — only page, limit, sort_by, sort_order, userId, couponId.
// Date-range filtering in the UI is applied client-side over loaded rows.
export interface IGetListRedemptionQuery {
  page: number;
  limit: number;
  sort_by?: "created_at" | "points_spent";
  sort_order?: "asc" | "desc";
  userId?: string;
  couponId?: string;
}

export interface ICoupon {
  id: string;
  title: string;
  description: string;
  points_cost: number;
  created_at: string;
  updated_at: string;
  _count: {
    redemptions: number;
  };
}

interface RedemptionUser {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
}

interface RedemptionCouponRef {
  id: string;
  title: string;
  points_cost: number;
}

export interface IRedemption {
  id: string;
  points_spent: number;
  created_at: string;
  userId: string;
  couponId: string;
  users: RedemptionUser;
  coupon: RedemptionCouponRef;
}

export interface ICouponDetail extends ICoupon {
  redemptions: {
    id: string;
    points_spent: number;
    created_at: string;
    userId: string;
    couponId: string;
    users: RedemptionUser;
  }[];
}

export interface IRedeemCouponResponse {
  redemption: {
    id: string;
    points_spent: number;
    created_at: string;
    userId: string;
    couponId: string;
  };
  balance: {
    points: number;
    seasonal_points: number;
  };
}
