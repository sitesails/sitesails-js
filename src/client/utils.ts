import 'cross-fetch/polyfill';

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

  let body;

  if (options?.formData) {
    body = options.formData;
  } else if (options?.body) {
    body = JSON.stringify(options?.body);
  }

  const result = await fetch(url, {
    method: options?.method || 'GET',
    body,
    headers: {
      'Content-Type': options?.formData ? undefined : 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!result.ok) {
    // eslint-disable-next-line
    console.error(result);
  }

  if (result.status === 404) {
    return null;
  }

  if (result.status === 204) {
    return null;
  }

  return result.json();
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
