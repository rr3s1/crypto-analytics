import React, { Suspense } from 'react';
import Image from 'next/image';
import DataTable from '@/components/DataTable';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';
import qs from 'query-string';
import TrendingCoins from '@/components/home/TrendingCoins';
import CoinOverview from '@/components/home/CoinOverview';
import { CoinOverviewFallback, TrendingCoinsFallback } from '@/components/fallback';

// Configuration for the data table columns

// The Page component is async to allow server-side data fetching
const Page = async (props: NextPageProps) => {
  const searchParams = await props.searchParams;

  // Use query-string to demonstrate its usage as requested
  // (e.g., parsing searchParams if they were a raw string, though Next provides them as an object)
  const query = qs.parse(qs.stringify(searchParams));
  const currency = (query.currency as string) || 'usd';

  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview currency={currency} />
        </Suspense>
        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins currency={currency} />
        </Suspense>
      </section>

      <section className="mt-7 w-full space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
};
export default Page;
