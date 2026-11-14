export interface IUserMembership {
  id: string;
  points: number;
  lifetime_points: number;
  created_at: Date;
  updated_at: Date;
  userId: string;
  tierId: string | null;
}

export interface IUserProfile {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  role: string;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
  /** Membership relation record (null when the user has no membership yet). */
  membership: IUserMembership | null;
}

/** Partial update payload for PATCH /user/profile — send only what changes. */
export interface IUpdateUserProfileRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
}
