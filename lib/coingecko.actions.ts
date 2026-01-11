import qs from 'query-string';

export const getCoinGeckoBaseUrl = () =>
  process.env.NEXT_PUBLIC_COINGECKO_BASE_URL ?? process.env.COINGECKO_BASE_URL ?? '';

export const isCoinGeckoProApi = (baseUrl?: string) => (baseUrl ?? '').includes('pro-api');

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const baseUrl = getCoinGeckoBaseUrl();
  const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY ?? process.env.COINGECKO_API_KEY;

  if (!baseUrl) {
    throw new Error(
      '[coingecko.actions] Missing COINGECKO_BASE_URL / NEXT_PUBLIC_COINGECKO_BASE_URL'
    );
  }
  if (!apiKey) {
    throw new Error(
      '[coingecko.actions] Missing COINGECKO_API_KEY / NEXT_PUBLIC_COINGECKO_API_KEY'
    );
  }

  const url = qs.stringifyUrl(
    {
      url: `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );

  const isPro = isCoinGeckoProApi(baseUrl);
  const response = await fetch(url, {
    headers: {
      [isPro ? 'x-cg-pro-api-key' : 'x-cg-demo-api-key']: apiKey,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

    console.error('[coingecko.actions] API Error', {
      endpoint,
      status: response.status,
      statusText: response.statusText,
      errorBody,
    });

    throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText}`);
  }

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
