export type PointTransactionType = "EARNED" | "REDEEMED" | "ADJUSTMENT";

export interface IGetListPointQuery {
  page: number;
  limit: number;
  sort_by?: "created_at" | "amount" | "type";
  sort_order?: "asc" | "desc";
  search_by?: "description" | "type";
  search?: string;
  type?: PointTransactionType;
  membershipId?: string;
  startDate?: string;
  endDate?: string;
}

interface PointTransactionUser {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
}

interface PointTransactionMembership {
  id: string;
  userId: string;
  users: PointTransactionUser;
}

export interface IPointTransaction {
  id: string;
  membershipId: string;
  amount: number;
  type: PointTransactionType;
  description: string;
  reference_id: string | null;
  created_at: Date;
  membership: PointTransactionMembership;
}

export interface IAdjustPointsRequest {
  membershipId: string;
  amount: number;
  type?: "ADJUSTMENT" | "EARNED";
  description?: string;
}

export interface IAdjustPointsResponse {
  history: IPointTransaction;
  points: number;
  seasonal_points: number;
  tier: {
    changed: boolean;
    oldTierId: string | null;
    newTierId: string | null;
  };
}
