export interface InstagramProfile {
  username: string;
  full_name: string;
  follower_count: number;
  following_count: number;
  biography: string;
  profile_pic_url_hd: string;
  external_url?: string;
  media_count: number;
  is_private: boolean;
  is_verified: boolean;
  has_spam_filter: boolean;
}
