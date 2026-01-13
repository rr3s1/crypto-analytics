# ![image](https://github.com/user-attachments/assets/c84d588f-dad3-428c-8c57-42f573e33802)

  <br />

   <img src="https://github.com/user-attachments/assets/cd28a634-f16f-4f37-8bef-e8359b9a9551" >
  
  <br /> 


<br />
   <img src="https://github.com/user-attachments/assets/3259bdfa-6422-4c14-bf84-a9c56f1d3635" >
 
  <br /> 

 
 <br />
   <img src="https://github.com/user-attachments/assets/5a4cce2c-14ee-4e51-98ff-fd421ca6f1e9" >
  
  <br /> 

 
  <br /> 
   <img src="https://github.com/user-attachments/assets/ff053505-b5d1-4070-b612-cc1f0154ff3d" >
 
  <br /> <br /> 
  
 
  

<div align="center">
 This project is based on a tutorial made by Adrian Hajdin - JavaScript Mastery on YT.
<br><br>
    <a href="https://youtu.be/-vsh_GxC-vg" target="_blank">Project Video</a>
    <br>
    <a href="https://github.com/rr3s1/crypto-analytics-craft" target="_blank">Project Source code</a><br><br>

   </div>

## 🎥 Video Reference

You can watch the tutorial
here: [JavaScript Mastery Tutorial](https://youtu.be/-vsh_GxC-vg).


## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets (Code to Copy)](#snippets)
6. 🔗 [Links](#links)
7. 📦 [Assets](#assets)

## <a name="introduction">🤖 Introduction</a>

CryptoPulse is a high-performance analytics dashboard built with Next.js 16, TailwindCSS v4, and shadcn/ui, delivering real-time market intelligence via CoinGecko's API and WebSockets. It features high-frequency price tracking and live orderbook streams for low-latency updates, paired with interactive TradingView candlestick charts to visualize OHLCV data with surgical precision. From a dynamic homepage showcasing global stats and trending assets to robust token pages with multi-fiat converters and advanced search tables, the platform provides a modular, developer-friendly stack optimized for speed and clarity.

If you're getting started and need assistance or face any bugs, join our active Discord community with over **50k+** members. It's a place where people help each other out.

<a href="https://discord.com/invite/n6EdbFJ" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/618f4872-1e10-42da-8213-1d69e486d02e" /></a>

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[Next.js](https://nextjs.org)** is a powerful React framework for building full-stack web applications. It simplifies development with features like server-side rendering, static site generation, and API routes, enabling developers to focus on building products and shipping quickly.

- **[TypeScript](https://www.typescriptlang.org/)** is a superset of JavaScript that adds static typing, providing better tooling, code quality, and error detection for developers. It is ideal for building large-scale applications and enhances the development experience.

- **[Tailwind CSS](https://tailwindcss.com/)** is a utility-first CSS framework that allows developers to rapidly build modern websites by composing styles directly in their HTML markup, which facilitates highly customized designs and ensures the smallest possible production CSS bundles.

- **[Shadcn/ui](https://ui.shadcn.com/docs)** is a collection of beautifully-designed, accessible React components that you copy and paste directly into your project (it is not a traditional npm library), giving you full source code ownership and total customization control to build your own design system often utilizing Tailwind CSS.

- **[CoinGecko API](https://jsm.dev/crypto-gecko)** is a comprehensive and reliable RESTful API that provides real-time and historical cryptocurrency market data, including prices, market capitalization, volume, and exchange information, enabling developers to build crypto tracking, analysis, and portfolio management applications.

- **[TradingView Lightweight Charts](https://www.tradingview.com/lightweight-charts/)** is a high-performance financial visualization library that provides interactive charting capabilities for rendering complex OHLCV data. It enables the integration of responsive candlestick charts and technical indicators, allowing users to perform professional-grade technical analysis with low-latency updates and surgical precision.

- **[SWR](https://swr.vercel.app/)** is a React Hooks library for data fetching that provides features like caching, revalidation, and focus revalidation, making it perfect for real-time data synchronization in crypto applications.

## <a name="features">🔋 Features</a>

👉 **Home Dashboard**: Displays crucial market health indicators like **Total Market Cap** and **BTC & ETH dominance**, alongside a dynamic list of **Trending Tokens**, all retrieved instantly using the CoinGecko `/global` and `/search/trending` endpoints.

👉 **Token Discovery Page**: A comprehensive, sortable and searchable table featuring key token metrics (Price, 24h change, Market Cap Rank) for mass market analysis, powered by the scalable `/coins/markets` REST API and optimized with pagination for efficient browsing.

👉 **Detailed Token Overview**: Provides an immediate summary of any selected token, including its logo, current price, and market cap rank, utilizing the `/coins/{id}` REST API for core data and the **CGSimplePrice WebSocket** for continuous, live price monitoring.

👉 **Interactive Candlestick Chart**: Integrates **TradingView Lightweight Charts** to visualize market trends and price action with surgical precision, rendering multi-timeframe OHLCV data fetched from CoinGecko's high-performance market endpoints.

👉 **Real-Time Trades & Orderbook**: Features a live stream of market activity exactly as it happens on the exchange, using low-latency WebSockets to display a constant flow of buy/sell orders and recent trade executions.

👉 **Smart Currency Converter**: An interactive tool that allows users to instantly compute coin amounts into dozens of supported fiat and crypto currencies, leveraging the `/simple/supported_vs_currencies` and `/simple/price` endpoints for accurate conversions.

👉 **Exchange & Trading Pairs**: Allows users to analyze trading context by displaying aggregated lists of exchanges and available trading pairs, with all data sourced directly from the dedicated `/exchanges` and `/exchanges/{id}/tickers` REST APIs.

👉 **Global Search Functionality**: A powerful, unified search bar that allows users to quickly locate any crypto asset by name or symbol, linking directly to the respective Token Detail Page via the CoinGecko `/search` and `/coins/{id}` REST endpoints.

And many more, including code architecture and reusability.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/rr3s1/crypto-analytics-craft.git
cd crypto-analytics-craft
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
COINGECKO_BASE_URL=https://pro-api.coingecko.com/api/v3
COINGECKO_API_KEY=your_coingecko_api_key

NEXT_PUBLIC_COINGECKO_WEBSOCKET_URL=wss://ws-api.coingecko.com/v3
NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key
```

Replace the placeholder values with your real credentials. You can get these by signing up at: [CoinGecko](https://www.coingecko.com/en/api).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>lib/coingecko.actions.ts</code></summary>

```typescript
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
```

</details>

<details>
<summary><code>hooks/useCoinGeckoWebSocket.ts</code></summary>

```typescript
'use client';

import { useEffect, useRef, useState } from 'react';

const WS_BASE = `${process.env.NEXT_PUBLIC_COINGECKO_WEBSOCKET_URL}?x_cg_pro_api_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`;

export const useCoinGeckoWebSocket = ({
  coinId,
  poolId,
  liveInterval,
}: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn => {
  const wsRef = useRef<WebSocket | null>(null);
  const subscribed = useRef(<Set<string>>new Set());

  const [price, setPrice] = useState<ExtendedPriceData | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [ohlcv, setOhlcv] = useState<OHLCData | null>(null);
  const [isWsReady, setIsWsReady] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(WS_BASE);
    wsRef.current = ws;

    const send = (payload: Record<string, unknown>) => ws.send(JSON.stringify(payload));

    const handleMessage = (event: MessageEvent) => {
      const msg: WebSocketMessage = JSON.parse(event.data);

      if (msg.type === 'ping') {
        send({ type: 'pong' });
        return;
      }
      if (msg.c === 'C1') {
        setPrice({
          usd: msg.p ?? 0,
          coin: msg.i,
          price: msg.p,
          change24h: msg.pp,
          marketCap: msg.m,
          volume24h: msg.v,
          timestamp: msg.t,
        });
      }
      if (msg.c === 'G2') {
        const newTrade: Trade = {
          price: msg.pu,
          value: msg.vo,
          timestamp: msg.t ?? 0,
          type: msg.ty,
          amount: msg.to,
        };

        setTrades((prev) => [newTrade, ...prev].slice(0, 7));
      }
      if (msg.ch === 'G3') {
        const timestamp = msg.t ?? 0;

        const candle: OHLCData = [
          timestamp,
          Number(msg.o ?? 0),
          Number(msg.h ?? 0),
          Number(msg.l ?? 0),
          Number(msg.c ?? 0),
        ];

        setOhlcv(candle);
      }
    };

    ws.onopen = () => setIsWsReady(true);
    ws.onmessage = handleMessage;
    ws.onclose = () => setIsWsReady(false);
    ws.onerror = () => setIsWsReady(false);

    return () => ws.close();
  }, []);

  useEffect(() => {
    if (!isWsReady) return;
    const ws = wsRef.current;
    if (!ws) return;

    const send = (payload: Record<string, unknown>) => ws.send(JSON.stringify(payload));

    const subscribe = (channel: string, data?: Record<string, unknown>) => {
      if (subscribed.current.has(channel)) return;

      send({ command: 'subscribe', identifier: JSON.stringify({ channel }) });

      if (data) {
        send({
          command: 'message',
          identifier: JSON.stringify({ channel }),
          data: JSON.stringify(data),
        });
      }
    };

    queueMicrotask(() => {
      setPrice(null);
      setTrades([]);
      setOhlcv(null);

      subscribe('CGSimplePrice', { coin_id: [coinId], action: 'set_tokens' });
    });

    const poolAddress = poolId.replace('_', ':') ?? '';

    if (poolAddress) {
      subscribe('OnchainTrade', {
        'network_id:pool_addresses': [poolAddress],
        action: 'set_pools',
      });

      subscribe('OnchainOHLCV', {
        'network_id:pool_addresses': [poolAddress],
        interval: liveInterval,
        action: 'set_pools',
      });
    }
  }, [coinId, poolId, isWsReady, liveInterval]);

  return {
    price,
    trades,
    ohlcv,
    isConnected: isWsReady,
  };
};
```

</details>

<details>
<summary><code>components/CandlestickChart.tsx</code></summary>

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi } from 'lightweight-charts';

interface CandlestickChartProps {
  data: OHLCData[];
  height?: number;
}

export default function CandlestickChart({ data, height = 400 }: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#374151' },
        horzLines: { color: '#374151' },
      },
      width: chartContainerRef.current.clientWidth,
      height,
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    candlestickSeries.setData(data);

    chartRef.current = chart;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [height]);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const candlestickSeries = chartRef.current.series()[0] as ReturnType<
        typeof chartRef.current.addCandlestickSeries
      >;
      candlestickSeries.setData(data);
    }
  }, [data]);

  return <div ref={chartContainerRef} className="w-full" />;
}
```

</details>

<details>
<summary><code>app/globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

.main-container {
  @apply container mx-auto px-4 sm:px-6 lg:px-8 py-8;
}

.home-grid {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-6;
}
```

</details>

<details>
<summary><code>next.config.ts</code></summary>

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
    ],
  },
};

export default nextConfig;
```

</details>

## <a name="links">🔗 Links</a>

Here is the list of all the resources used in the project:

- [Next.js Documentation](https://nextjs.org/docs)
- [CoinGecko API](https://www.coingecko.com/en/api)
- [TradingView Lightweight Charts](https://www.tradingview.com/lightweight-charts/)
- [Shadcn/ui Components](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [SWR Documentation](https://swr.vercel.app/docs/getting-started)

## <a name="assets">📦 Assets</a>

Assets and snippets used in the project can be found in the **[video kit](https://jsmastery.com/video-kit/d1bcad71-45c0-477c-82c8-e71ae39ae6f4)**.

<a href="https://jsmastery.com/video-kit/d1bcad71-45c0-477c-82c8-e71ae39ae6f4" target="_blank">
  <img src="public/readme/readme-videokit.webp" alt="Video Kit Banner">
</a>

## 💡 What I Learned

As this was my first major crypto analytics project, I gained valuable experience in:

##### **Next.js Development**

- Understanding Next.js 16 App Router architecture and server components.
- Implementing Server-Side Rendering (SSR) and Static Site Generation (SSG) for optimal performance.
- Managing API routes and server actions for data fetching.
- Utilizing Suspense boundaries and fallback components for better UX.

##### **Real-Time Data Handling**

- Implementing WebSocket connections for live price updates and trade streams.
- Managing WebSocket lifecycle and reconnection logic.
- Handling real-time OHLCV data for candlestick charts.
- Optimizing WebSocket subscriptions and unsubscriptions.

##### **Data Visualization**

- Integrating TradingView Lightweight Charts for financial data visualization.
- Creating responsive candlestick charts with custom styling.
- Handling dynamic data updates in chart components.
- Implementing multi-timeframe chart support.

##### **State Management & Data Fetching**

- Using SWR for efficient data fetching and caching.
- Implementing optimistic updates and error handling.
- Managing client and server state synchronization.
- Optimizing API calls with revalidation strategies.

##### **TypeScript & Type Safety**

- Creating comprehensive type definitions for API responses.
- Implementing type-safe WebSocket message handling.
- Building reusable type utilities for the codebase.
- Ensuring type safety across client and server boundaries.

##### **UI Component Architecture**

- Building reusable components with shadcn/ui.
- Creating accessible and responsive UI components.
- Implementing dark mode support with Tailwind CSS.
- Designing modular component structures for scalability.

##### **API Integration**

- Working with RESTful APIs (CoinGecko).
- Handling API rate limits and error responses.
- Implementing query parameter management.
- Optimizing API calls with caching and revalidation.

## 🤝 Acknowledgments

Adrian Hajdin: For the comprehensive tutorial and guidance. [JavaScript Mastery](https://www.youtube.com/@javascriptmastery).

## 📄 License

This project is licensed under the MIT License.

Note: This project is for educational purposes and is free to use under the terms of the MIT License.
