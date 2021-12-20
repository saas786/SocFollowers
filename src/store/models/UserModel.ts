export default interface User {
  firebase_token: string|null;
  created_at: string|null;
  updated_at: string|null;
  stripe_id: string|null;
  language: string|null;
  country: string|null;
  tier_id: number;
  balance: number;
  coins: number;
  id: number;
}