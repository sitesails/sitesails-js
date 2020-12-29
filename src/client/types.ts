export type Configuration = {
  publicApiKey: string | null;
  adminApiKey: string | null;
  apiUrl: string | null;
  debug?: boolean;
};

export type FetchOptions = {
  transformation?: (data: any) => any;
  method?: string;
  body?: any;
  formData?: any;
  headers?: Record<string, unknown>;
  admin?: boolean;
  list?: boolean;
};
