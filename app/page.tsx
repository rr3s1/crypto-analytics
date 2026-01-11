import React, { Suspense } from 'react';
import CoinOverview from '@/components/home/CoinOverview';
import { CategoriesFallback, CoinOverviewFallback } from '@/components/home/fallback';
import Categories from '@/components/home/Categories';

const Page = async () => {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>
      </section>

      <section className="mt-7 w-full space-y-4">
        <Suspense fallback={<CategoriesFallback />}>
          <Categories />
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
