import { NextRequest, NextResponse } from 'next/server';
import { slackService } from '@/lib/services/slack';

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json();

    // Validate required fields
    if (!leadData.name || !leadData.email) {
      return NextResponse.json(
        { error: 'Missing required fields: name and email' },
        { status: 400 }
      );
    }

    // Send Slack notification
    const success = await slackService.sendLeadNotification(leadData);

    if (success) {
      return NextResponse.json(
        {
          success: true,
          message: 'Slack notification sent successfully',
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send Slack notification',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Slack notification API error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
