import axios from 'axios';

import { Configuration, FetchOptions } from './types';

function getQueryString(params: any) {
  return [
    ...Object.keys(params)
      .filter((p) => params[p] != null)
      .map((p) => `${p}=${params[p]}`),
  ].join('&');
}

async function fetchJson(url: string, options?: any) {
  if (options.debug) {
    // eslint-disable-next-line
    console.warn(url);
  }

  try {
    let headers = options.headers || {};

    if (options?.formData) {
      headers = { ...headers, ...options.formData.getHeaders() };
    }

    const result = await axios({
      method: options?.method || 'GET',
      url,
      data: options?.body || options?.formData,
      headers,
    });

    if (result.status === 404) {
      return null;
    }

    if (result.status === 204) {
      return null;
    }

    return result.data;
  } catch (ex) {
    // eslint-disable-next-line
    console.error(ex);
  }

  return null;
}

export async function siteSailsFetch(
  configuration: Configuration,
  routeUrl: string,
  params: any,
  options?: FetchOptions,
) {
  let queryParams: any = {};

  if (params) {
    queryParams = { ...params };

    if (params.filters) {
      queryParams = { ...params, ...params.filters };
      queryParams.filters = undefined;
    }
  }

  let apiKeyParameter;

  if (!options?.headers?.Authorization) {
    apiKeyParameter = options?.admin
      ? configuration.adminApiKey
      : configuration.publicApiKey;
  }

  const result = await fetchJson(
    `${configuration.apiUrl}${routeUrl}?${getQueryString({
      ...queryParams,
      apiKey: apiKeyParameter,
    })}`,
    {
      debug: configuration.debug,
      method: options?.method,
      body: options?.body,
      headers: options?.headers,
      formData: options?.formData,
    },
  );

  if (options?.list) {
    return {
      data: options?.transformation
        ? result.data.map(options.transformation)
        : result.data,
      meta: result.meta,
    };
  }

  return options?.transformation ? options.transformation(result) : result;
}
