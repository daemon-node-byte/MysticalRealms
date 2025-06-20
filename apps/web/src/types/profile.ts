export interface ProfileCompletion {
  isComplete: boolean;
  completionPercentage: number;
  missingFields: string[];
  requiredFields: {
    username: boolean;
    bio: boolean;
    status: boolean;
  };
}

export interface ProfileFormData {
  username: string;
  bio: string;
  status: string;
}

export interface Profile {
  id: string;
  username: string | null;
  bio: string | null;
  avatar_url: string | null;
  status: string | null;
  badges: string[] | null;
  created_at: string;
}
