export interface CryptocurrencyData {
  IMAGE_URL: string;
  TWITTER_ACCOUNTS: { URL: string }[];
  DISCORD_SERVERS: { URL: string }[];
  TELEGRAM_GROUPS: { URL: string }[];
  WEBSITE_URL: string;
  PROJECT_LEADERS: { FULL_NAME: string; LEADER_TYPE: string }[];
  ASSET_DESCRIPTION_SNIPPET: string;
  ASSET_DESCRIPTION_SUMMARY: string;
  SUBREDDITS: { URL: string }[];
}
