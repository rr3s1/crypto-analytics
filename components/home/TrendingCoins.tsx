import React from 'react';
import DataTable from '@/components/DataTable';
import { fetcher } from '@/lib/coingecko.actions';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';

const TrendingCoins = async ({ currency }: { currency: string }) => {
  const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>('/search/trending', undefined, 300);

  // Configuration for the data table columns
  const columns: DataTableColumn<TrendingCoin>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        return (
          <Link href={`/coin/${item.id}`}>
            <Image src={item.large} alt={item.name} width={36} height={36} />
            <p>{item.name}</p>
          </Link>
        );
      },
    },
    {
      header: '24h Change',
      cellClassName: 'name-cell',
      cell: (coin) => {
        const item = coin.item;
        // Determine if the price change is positive or negative
        const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
        return (
          <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
            &nbsp; {item.data.price_change_percentage_24h.usd.toFixed(2)}%
          </div>
        );
      },
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (coin) => formatCurrency(coin.item.data.price, currency.toUpperCase()),
    },
  ];

  return (
    <div id="trending-coins">
      <h4>Trending Coins</h4>
      {/* Render table with dummy data (to be replaced later) */}
      <DataTable
        data={trendingCoins.coins.slice(0, 6) || []}
        columns={columns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"
        headerCellClassName="py-3!"
        bodyCellClassName="py-2!"
      />
    </div>
  );
};
export default TrendingCoins;
