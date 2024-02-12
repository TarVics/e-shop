export type ApiDate = string;
export type ApiKey = number;
export type ApiRef = number;
export type ApiUid = string;
export type ApiToken = string;

export const toApiKey = (value: any): ApiKey => (typeof value === "string") ? parseInt(value) : Number(value);
