import React from 'react';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type LiveCoinHeaderProps = {
  name: string;
  image: string;
  livePrice?: number | null;
  livePriceChangePercentage24h?: number | null;
  priceChangePercentage30d?: number | null;
  priceChange24h?: number | null;
};

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value);

const CoinHeader = ({
  livePriceChangePercentage24h,
  priceChangePercentage30d,
  name,
  image,
  livePrice,
  priceChange24h,
}: LiveCoinHeaderProps) => {
  const isTrendingUp =
    isFiniteNumber(livePriceChangePercentage24h) && livePriceChangePercentage24h > 0;
  const isThirtyDayUp = isFiniteNumber(priceChangePercentage30d) && priceChangePercentage30d > 0;
  const isPriceChangeUp = isFiniteNumber(priceChange24h) && priceChange24h > 0;

  const stats = [
    {
      label: 'Today',
      value: livePriceChangePercentage24h,
      isUp: isTrendingUp,
      formatter: formatPercentage,
      showIcon: true,
    },
    {
      label: '30 Days',
      value: priceChangePercentage30d,
      isUp: isThirtyDayUp,
      formatter: formatPercentage,
      showIcon: true,
    },
    {
      label: 'Price Change (24h)',
      value: priceChange24h,
      isUp: isPriceChangeUp,
      formatter: formatCurrency,
      showIcon: false,
    },
  ];

  return (
    <div id="coin-header">
      <h3>{name}</h3>

      <div className="info">
        <Image src={image} alt={name} width={77} height={77} />

        <div className="price-row">
          <h1>{isFiniteNumber(livePrice) ? formatCurrency(livePrice) : '-'}</h1>
          <Badge className={cn('badge', isTrendingUp ? 'badge-up' : 'badge-down')}>
            {isFiniteNumber(livePriceChangePercentage24h)
              ? formatPercentage(livePriceChangePercentage24h)
              : '-'}
            {isTrendingUp ? <TrendingUp /> : <TrendingDown />}
            (24h)
          </Badge>
        </div>
      </div>

      <ul className="stats">
        {stats.map((stat) => (
          <li key={stat.label}>
            <p className="label">{stat.label}</p>

            <div
              className={cn('value', {
                'text-green-500': stat.isUp,
                'text-red-500': !stat.isUp,
              })}
            >
              <p>{isFiniteNumber(stat.value) ? stat.formatter(stat.value) : '-'}</p>
              {stat.showIcon &&
                (stat.isUp ? (
                  <TrendingUp width={16} height={16} />
                ) : (
                  <TrendingDown width={16} height={16} />
                ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoinHeader;
