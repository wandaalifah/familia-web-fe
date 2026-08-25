export type PointTransactionType = "EARN" | "REDEEM" | "ADJUST";

export interface IGetListPointsQuery {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  search_by?: string;
  search?: string;
  type?: PointTransactionType;
}

interface PointsHistoryUser {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
}

interface PointsHistoryMembership {
  id: string;
  userId: string;
  users: PointsHistoryUser;
}

interface PointsHistoryItem {
  id: string;
  amount: number;
  type: PointTransactionType;
  description: string | null;
  reference_id: string | null;
  created_at: Date;
  membershipId: string;
  membership: PointsHistoryMembership;
}

export interface IPointsHistoryItem extends PointsHistoryItem {}
