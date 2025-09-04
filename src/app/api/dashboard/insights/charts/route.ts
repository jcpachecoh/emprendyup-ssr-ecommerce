import { NextRequest, NextResponse } from 'next/server';
import { ChartDataSchema } from '@/lib/schemas/dashboard';

// Mock chart data
const mockChartData = {
  customersGrowth: [
    { date: '2024-01', customers: 100 },
    { date: '2024-02', customers: 150 },
    { date: '2024-03', customers: 200 },
    { date: '2024-04', customers: 280 },
    { date: '2024-05', customers: 350 },
    { date: '2024-06', customers: 420 },
  ],
  topSources: [
    { source: 'Instagram', customers: 450, percentage: 35 },
    { source: 'WhatsApp', customers: 380, percentage: 30 },
    { source: 'Facebook', customers: 250, percentage: 20 },
    { source: 'Direct', customers: 154, percentage: 15 },
  ],
  salesFunnel: [
    { stage: 'Visitors', count: 10000, percentage: 100 },
    { stage: 'Leads', count: 1500, percentage: 15 },
    { stage: 'Prospects', count: 500, percentage: 5 },
    { stage: 'Customers', count: 150, percentage: 1.5 },
  ],
};

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Validate data with Zod
    const validatedChartData = ChartDataSchema.parse(mockChartData);

    return NextResponse.json(validatedChartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return NextResponse.json({ error: 'Failed to fetch chart data' }, { status: 500 });
  }
}
