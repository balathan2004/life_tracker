export interface ResponseConfig {
  status: 200 | 300;
  message: string;
}

export interface QuoteResponseConfig {
  quote: string;
}

export interface AuthResponseConfig extends ResponseConfig {
  credentials: UserDataInterface;
}

export interface UserDataInterface {
  display_name: string;
  profile_url: string;
  uid: string;
}
