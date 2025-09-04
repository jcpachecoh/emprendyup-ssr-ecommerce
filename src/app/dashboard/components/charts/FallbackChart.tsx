'use client';

import React from 'react';

interface FallbackChartProps {
  title?: string;
  data: Array<{ [key: string]: any }>;
  type: 'line' | 'bar';
}

export default function FallbackChart({ title, data, type }: FallbackChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      )}

      <div className="h-64 flex items-center justify-center text-center">
        <div className="text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-sm">Chart loading...</p>
          <p className="text-xs mt-1">{data.length} data points available</p>
        </div>
      </div>
    </div>
  );
}
