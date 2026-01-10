'use client';
// components/CandlestickChart.tsx

import React, { useEffect, useRef, useState, useTransition } from 'react';
import {
  getCandlestickConfig,
  getChartConfig,
  LIVE_INTERVAL_BUTTONS,
  PERIOD_BUTTONS,
  PERIOD_CONFIG,
} from '@/constants';
import { CandlestickSeries, createChart, IChartApi, ISeriesApi } from 'lightweight-charts';
import { fetcher } from '@/lib/coingecko.actions';
import { convertOHLCData } from '@/lib/utils';

const CandlestickChart = ({
  children,
  data,
  coinId,
  height = 360,
  initialPeriod = 'daily',
  liveOhlcv = null,
  mode = 'historical',
  liveInterval,
  setLiveInterval,
}: CandlestickChartProps) => {
  // Refs to maintain chart instances across renders without triggering re-renders
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const prevOhlcDataLength = useRef<number>(data?.length || 0);

  // State for the selected time period and the chart data
  const [period, setPeriod] = useState(initialPeriod);
  const [ohlcData, setOhlcData] = useState<OHLCData[]>(data ?? []);

  // useTransition allows state updates to be interrupted, keeping the UI responsive
  const [isPending, startTransition] = useTransition();

  // Fetches new OHLC data based on the selected period configuration
  const fetchOHLCData = async (selectedPeriod: Period) => {
    try {
      const { days } = PERIOD_CONFIG[selectedPeriod];

      const newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: 'usd',
        days,
        precision: 'full',
      });

      // Update data state with the new API response
      startTransition(() => {
        setOhlcData(newData ?? []);
      });
    } catch (e) {
      console.error('Failed to fetch OHLCData', e);
    }
  };

  // Handles button clicks to switch periods
  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === period) return;

    // Wrap updates in startTransition to prevent UI freezing
    startTransition(async () => {
      setPeriod(newPeriod);
      await fetchOHLCData(newPeriod);
    });
  };

  // Effect 1: Initialize Chart, Resize Observer, and Initial Data Render
  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    // Determine if time labels should show based on the period granularity
    const showTime = ['daily', 'weekly', 'monthly'].includes(period);

    // Initialize the chart
    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });

    // Add the candlestick series to the chart
    const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());

    // Convert API timestamps (ms) to Chart timestamps (seconds) for initial data
    const convertedToSeconds = ohlcData.map(
      (item) => [Math.floor(item[0] / 1000), item[1], item[2], item[3], item[4]] as OHLCData
    );

    // Set the initial data and fit the chart to view
    series.setData(convertOHLCData(convertedToSeconds));
    chart.timeScale().fitContent();

    // Store references
    chartRef.current = chart;
    candleSeriesRef.current = series;

    // Setup ResizeObserver to make the chart responsive
    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;
      chart.applyOptions({ width: entries[0].contentRect.width });
    });
    observer.observe(container);

    // Cleanup function to prevent memory leaks
    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, [height, period]); // Re-run initialization if height or period changes

  // Effect 2: Handle Data Updates separately from Chart Initialization
  useEffect(() => {
    if (!candleSeriesRef.current) return;

    // Convert timestamps (ms -> s) for updated data
    const convertedToSeconds = ohlcData.map(
      (item) => [Math.floor(item[0] / 1000), item[1], item[2], item[3], item[4]] as OHLCData
    );

    let merged: OHLCData[];

    if (liveOhlcv) {
      const liveTimestamp = liveOhlcv[0];

      const lastHistoricalCandle = convertedToSeconds[convertedToSeconds.length - 1];

      if (lastHistoricalCandle && lastHistoricalCandle[0] === liveTimestamp) {
        merged = [...convertedToSeconds.slice(0, -1), liveOhlcv];
      } else {
        merged = [...convertedToSeconds, liveOhlcv];
      }
    } else {
      merged = convertedToSeconds;
    }

    merged.sort((a, b) => a[0] - b[0]);

    // Update the existing series with new data and refit content
    const converted = convertOHLCData(convertedToSeconds);
    candleSeriesRef.current.setData(converted);
    const dataChanged = prevOhlcDataLength.current !== ohlcData.length;

    if (dataChanged || mode === 'historical') {
      chartRef.current?.timeScale().fitContent();
      prevOhlcDataLength.current = ohlcData.length;
    }
  }, [ohlcData, period, liveOhlcv, mode]);
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
              disabled={isPending} // Disable buttons while data is fetching
            >
              {label}
            </button>
          ))}
        </div>

        {liveInterval && (
          <div className="button-group">
            <span className="mx-2 text-sm font-medium text-purple-100/50">Update Frequency:</span>
            {LIVE_INTERVAL_BUTTONS.map(({ value, label }) => (
              <button
                key={value}
                className={liveInterval === value ? 'config-button-active' : 'config-button'}
                onClick={() => setLiveInterval && setLiveInterval(value)}
                disabled={isPending}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={chartContainerRef} className="chart" style={{ height }} />
    </div>
  );
};
export default CandlestickChart;
