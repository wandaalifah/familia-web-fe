export interface IGetListMembershipQuery {
  page: number;
  limit: number;
  sort_by?: "created_at" | "points" | "seasonal_points" | "first_name" | "email";
  sort_order?: "asc" | "desc";
  search_by?: "name" | "email" | "phone";
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
  last_season_reset: Date | string | null;
  created_at: Date | string;
  updated_at: Date | string;
  userId: string;
  tierId: string | null;
  users: MembershipUser;
  tiers: MembershipTier | null;
}

interface TierHistoryEntry {
  id: string;
  created_at: Date | string;
  old_tier: { id: string; name: string; level: number } | null;
  new_tier: { id: string; name: string; level: number } | null;
}

interface PointsHistoryEntry {
  id: string;
  amount: number;
  type: string;
  description: string;
  created_at: Date | string;
}

export interface IMembershipDetail extends IMembership {
  users: MembershipUser & { avatar: string | null };
  points_history: PointsHistoryEntry[];
  tier_history: TierHistoryEntry[];
}

export interface ICreateMembershipRequest {
  email: string;
  phone: string;
  first_name: string;
  last_name?: string;
  password: string;
}

/** Lightweight tier option used for the tier-filter and change-tier dropdowns. */
export interface ITierOption {
  id: string;
  name: string;
  level: number;
  required_points: number;
}
