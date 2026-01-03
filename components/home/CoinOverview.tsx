import React from 'react';
import Image from 'next/image';
import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';

const CoinOverview = async ({ currency }: { currency: string }) => {
  // Fetch real Bitcoin data from CoinGecko API
  const coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
    vs_currency: currency,
    dex_pair_format: 'symbol',
  });
  return (
    <div id="coin-overview">
      <div className="header">
        {/* Render dynamic image from API data */}
        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />

        <div className="info">
          {/* Render dynamic name and symbol */}
          <p>
            {coin.name} / {coin.symbol.toUpperCase()}
          </p>
          {/* Render dynamic price */}
          <h1>
            {formatCurrency(coin.market_data.current_price[currency], currency.toUpperCase())}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default CoinOverview;
