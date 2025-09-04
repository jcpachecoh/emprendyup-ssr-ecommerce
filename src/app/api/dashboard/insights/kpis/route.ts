import { NextRequest, NextResponse } from 'next/server';
import { KPISchema } from '@/lib/schemas/dashboard';

// Mock KPI data
const mockKPIs = {
  totalCustomers: 1234,
  totalOrders: 892,
  monthlyRevenue: 45600,
  conversionRate: 3.2,
  averageOrderValue: 78.5,
};

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validate data with Zod
    const validatedKPIs = KPISchema.parse(mockKPIs);

    return NextResponse.json(validatedKPIs);
  } catch (error) {
    console.error('Error fetching KPIs:', error);
    return NextResponse.json({ error: 'Failed to fetch KPIs' }, { status: 500 });
  }
}
