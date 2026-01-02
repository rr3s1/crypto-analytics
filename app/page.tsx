import React from 'react'
import Image from 'next/image'
import DataTable from "@/components/DataTable";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {TrendingDown, TrendingUp} from "lucide-react";
import {fetcher} from "@/lib/coingecko.actions";
import {formatCurrency} from "@/lib/utils";
import qs from "query-string";

// Configuration for the data table columns


// Placeholder data for the trending coins table
const dummyTrendingCoins: TrendingCoin[] = [
    {
        item: {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC',
            market_cap_rank: 1,
            thumb: '/logo.svg',
            large: '/logo.svg',
            data: {
                price: 96000.00,
                price_change_percentage_24h: {
                    usd: 5.24
                }
            }
        }
    },
    {
        item: {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'ETH',
            market_cap_rank: 2,
            thumb: '/logo.svg',
            large: '/logo.svg',
            data: {
                price: 3400.00,
                price_change_percentage_24h: {
                    usd: -1.2
                }
            }
        }
    }
]

// The Page component is async to allow server-side data fetching
const Page = async (props: NextPageProps) => {
    const searchParams = await props.searchParams;

    // Use query-string to demonstrate its usage as requested
    // (e.g., parsing searchParams if they were a raw string, though Next provides them as an object)
    const query = qs.parse(qs.stringify(searchParams));
    const currency = (query.currency as string) || 'usd';

    // Fetch real Bitcoin data from CoinGecko API
    const coin = await fetcher<CoinDetailsData>('/coins/bitcoin',{
        vs_currency: currency,
        dex_pair_format: "symbol"
    });

    // Configuration for the data table columns
    const columns: DataTableColumn<TrendingCoin>[] = [
        {
            header: "Name",
            cellClassName: "name-cell",
            cell: (coin) => {
                const item = coin.item;
                return (
                    <Link href={`/coin/${item.id}`}>
                        <Image src={item.large} alt={item.name} width={36} height={36}/>
                        <p>{item.name}</p>
                    </Link>
                )
            }
        },
        {
            header: "24h Change",
            cellClassName: "name-cell",
            cell: (coin) => {
                const item = coin.item;
                // Determine if the price change is positive or negative
                const isTrendingUp =  item.data.price_change_percentage_24h.usd > 0;
                return (
                    <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
                        {isTrendingUp ? (
                            <TrendingUp width={16} height={16}/>
                        ) : (
                            <TrendingDown width={16} height={16}/>
                        )}
                        &nbsp; {item.data.price_change_percentage_24h.usd.toFixed(2)}%
                    </div>
                )
            }
        },
        {
            header: "Price",
            cellClassName: "price-cell",
            cell: (coin) => formatCurrency(coin.item.data.price, currency.toUpperCase())
        },
    ]

    return (
        <main className="main-container">
            <section className="home-grid">
                <div  id="coin-overview">
                    <div className="header">
                        {/* Render dynamic image from API data */}
                        <Image src={coin.image.large} alt={coin.name} width={56} height={56} />

                        <div className="info">
                            {/* Render dynamic name and symbol */}
                            <p>{coin.name} / {coin.symbol.toUpperCase()}</p>
                            {/* Render dynamic price */}
                            <h1>{formatCurrency(coin.market_data.current_price[currency], currency.toUpperCase())}</h1>
                        </div>
                    </div>

                </div>

                <p>Trending Coins</p>
                {/* Render table with dummy data (to be replaced later) */}
                <DataTable
                    data={dummyTrendingCoins}
                    columns={columns}
                    rowKey={(coin) => coin.item.id}
                />
            </section>

            <section className="w-full mt-7 space-y-4">
                <p>Categories</p>
            </section>
        </main>
    )
}
export default Page