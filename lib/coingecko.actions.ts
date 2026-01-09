'use server';

import qs from 'query-string';

// Retrieve environment variables for API configuration
const BASE_URL = process.env.COINGECKO_BASE_URL as string;
const API_KEY = process.env.COINGECKO_API_KEY as string;

// Validate that essential configuration exists before proceeding
if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

// Generic fetcher function to handle API requests with type safety
export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60 // Default cache revalidation set to 60 seconds
): Promise<T> {
  // Construct the full URL with query parameters
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );

  // Perform the fetch request with the appropriate authentication header
  const isPro = BASE_URL.includes('pro-api');
  const response = await fetch(url, {
    headers: {
      [isPro ? 'x-cg-pro-api-key' : 'x-cg-demo-api-key']: API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  });

  // Handle HTTP errors by throwing a descriptive message
  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));
    const errorMessage =
      typeof errorBody.error === 'string' ? errorBody.error : JSON.stringify(errorBody);
    throw new Error(`API Error: ${response.status}: ${errorMessage}`);
  }

  // Return the parsed JSON data
  return response.json();
}

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null
): Promise<PoolData> {
  const fallback: PoolData = {
    id: '',
    address: '',
    name: '',
    network: '',
  };

  if (network && contractAddress) {
    try {
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`
      );

      return poolData.data?.[0] ?? fallback;
    } catch (error) {
      console.log(error);
      return fallback;
    }
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>('/onchain/search/pools', { query: id });

    return poolData.data?.[0] ?? fallback;
  } catch {
    return fallback;
  }
}
