export interface IGetListMembershipQuery {
  page: number;
  limit: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  search_by?: string;
  search?: string;
  tier_id?: string;
}

interface MembershipUser {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface MembershipTier {
  id: string;
  name: string;
  required_points: number;
}

export interface IMembership {
  id: string;
  points: number;
  seasonal_points: number;
  created_at: Date;
  updated_at: Date;
  userId: string;
  tierId: string | null;
  users: MembershipUser;
  tiers: MembershipTier | null;
}