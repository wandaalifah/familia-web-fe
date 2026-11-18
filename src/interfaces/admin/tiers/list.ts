export interface IGetListTierQuery {
  page: number;
  limit: number;
  sort_by?: "created_at" | "name" | "level" | "required_points";
  sort_order?: "asc" | "desc";
  search_by?: "name" | "description";
  search?: string;
}

export interface ITier {
  id: string;
  name: string;
  description: string;
  level: number;
  required_points: number;
  created_at: Date | string;
  updated_at: Date | string;
  _count: {
    memberships: number;
  };
}

export interface ITierMember {
  id: string;
  points: number;
  seasonal_points: number;
  users: {
    id: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
  };
}

export interface ITierDetail extends ITier {
  memberships: ITierMember[];
}

export interface ICreateTierRequest {
  name: string;
  description?: string;
  level: number;
  required_points?: number;
}

export interface IUpdateTierRequest {
  name?: string;
  description?: string;
  level?: number;
  required_points?: number;
  resync_members?: boolean;
}

export interface IUpdateTierResponse extends ITier {
  resync?: {
    evaluated: number;
    changed: number;
  };
}

export interface IDeleteTierResponse extends ITier {
  affected_members: number;
  warning: string | null;
}
