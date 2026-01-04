import React, { startTransition, useRef, useState } from 'react';
import { PERIOD_BUTTONS, PERIOD_CONFIG } from '@/constants';
import { IChartApi, ISeriesApi } from 'lightweight-charts';
import { fetcher } from '@/lib/coingecko.actions';

const CandlestickChart = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod = 'daily',
}: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState(initialPeriod);
  const [ohlcData, setOhlcData] = useState<OHLCData[]>(data ?? []);

  const fetchOHLCData = async (selectedPeriod: Period) => {
    try {
      const { days, interval } = PERIOD_CONFIG[selectedPeriod];

      const newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: 'usd',
        days,
        interval,
        precision: 'full',
      });

      startTransition(() => {
        setOhlcData(newData ?? []);
      });
    } catch (e) {
      console.error('Failed to fetch OHLCData', e);
    }
  };

  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === period) return;

    // TO DO update period
    setPeriod(newPeriod);
  };

  return (
    <div id="candlestick-chart">
      <div className="chart-header">
        <div className="flex-1">{children}</div>

        <div className="button-group">
          <span className="mx-2 text-sm font-medium text-purple-100/50">Period:</span>
          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              className={period === value ? 'config-button-active' : 'config-button'}
              onClick={() => handlePeriodChange(value)}
              disabled={isPending}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartContainerRef} className="chart" style={{ height }} />
    </div>
  );
};
export default CandlestickChart;
