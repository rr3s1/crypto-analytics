import React from 'react';
import { fetcher } from '@/lib/coingecko.actions';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { CoinOverviewFallback } from './fallback';
import CandlestickChart from '@/components/CandlestickChart';
import CoinHeader from '@/components/CoinHeader';
import Converter from '@/components/Converter';

const CoinOverview = async () => {
  try {
    const [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>('/coins/bitcoin'),
      fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
        vs_currency: 'usd',
        days: 1,
        precision: 'full',
      }),
    ]);

    const coinDetails = [
      {
        label: 'Market Cap',
        value: formatCurrency(coin.market_data.market_cap.usd),
      },
      {
        label: 'Market Cap Rank',
        value: `# ${coin.market_cap_rank}`,
      },
      {
        label: 'Total Volume',
        value: formatCurrency(coin.market_data.total_volume.usd),
      },
      {
        label: 'Website',
        value: '-',
        link: coin.links.homepage[0],
        linkText: 'Homepage',
      },
      {
        label: 'Explorer',
        value: '-',
        link: coin.links.blockchain_site[0],
        linkText: 'Explorer',
      },
      {
        label: 'Community',
        value: '-',
        link: coin.links.subreddit_url,
        linkText: 'Community',
      },
    ];

    return (
      <>
        {/* Left Column: Bitcoin Header + Full-width Chart */}
        <div id="coin-overview" className="col-span-1 xl:col-span-2">
          <CoinHeader
            name={coin.name}
            image={coin.image.large}
            livePrice={coin.market_data.current_price.usd}
            livePriceChangePercentage24h={coin.market_data.price_change_percentage_24h_in_currency.usd}
            priceChangePercentage30d={coin.market_data.price_change_percentage_30d_in_currency.usd}
            priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
          />

          <CandlestickChart data={coinOHLCData} coinId="bitcoin">
            <h4 className="text-xl font-semibold">Trend Overview</h4>
          </CandlestickChart>
        </div>

        {/* Right Column: Converter + Coin Details */}
        <div className="col-span-1 space-y-6">
          <Converter
            symbol={coin.symbol}
            icon={coin.image.small}
            priceList={coin.market_data.current_price}
          />

          <div className="details space-y-4">
            <h4 className="text-xl font-semibold">Coin Details</h4>
            <ul className="grid grid-cols-2 gap-3">
              {coinDetails.map(({ label, value, link, linkText }, index) => (
                <li key={index} className="bg-dark-400 flex flex-col gap-2 rounded-lg p-4">
                  <p className="text-purple-100 text-sm">{label}</p>
                  {link ? (
                    <div className="flex items-center gap-1 text-green-500">
                      <Link href={link} target="_blank" className="truncate text-sm">
                        {linkText || label}
                      </Link>
                      <ArrowUpRight size={14} />
                    </div>
                  ) : (
                    <p className="font-medium text-white">{value}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching coin overview:', error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;
