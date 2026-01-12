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

type CoinSearchResponse = {
  coins: Array<{
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number | null;
    thumb: string;
    large: string;
  }>;
};

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  const cleaned = query.trim();
  if (!cleaned) return [];

  const search = await fetcher<CoinSearchResponse>('/search', { query: cleaned }, 60);
  const topMatches = (search.coins ?? []).slice(0, 10);

  const ids = topMatches.map((coin) => coin.id).filter(Boolean);
  if (ids.length === 0) return [];

  let markets: CoinMarketData[] = [];
  try {
    markets = await fetcher<CoinMarketData[]>(
      '/coins/markets',
      {
        vs_currency: 'usd',
        ids: ids.join(','),
        price_change_percentage: '24h',
      },
      60
    );
  } catch {
    markets = [];
  }

  const marketById = new Map(markets.map((m) => [m.id, m]));

  return topMatches.map((coin) => {
    const market = marketById.get(coin.id);

    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      market_cap_rank: coin.market_cap_rank ?? null,
      thumb: coin.thumb,
      large: coin.large,
      data: {
        price: market?.current_price,
        price_change_percentage_24h: market?.price_change_percentage_24h ?? 0,
      },
    };
  });
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
