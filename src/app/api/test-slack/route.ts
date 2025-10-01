import { NextRequest, NextResponse } from 'next/server';
import { slackService } from '@/lib/services/slack';

export async function POST(request: NextRequest) {
  try {
    // Verificar que sea un entorno de desarrollo o tenga la key correcta
    const { searchParams } = new URL(request.url);
    const testKey = searchParams.get('key');

    if (process.env.NODE_ENV === 'production' && testKey !== process.env.SLACK_TEST_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    let result;
    if (body.type === 'test') {
      // Enviar notificación de prueba
      result = await slackService.sendTestNotification();
    } else if (body.leadData) {
      // Enviar notificación con datos específicos
      result = await slackService.sendLeadNotification(body.leadData);
    } else {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (result) {
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
    console.error('Test Slack API Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Endpoint simple para verificar que la API funciona
  return NextResponse.json(
    {
      message: 'Slack test API is working',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      webhookConfigured: !!(
        process.env.SLACK_WEBHOOK_URL || process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL
      ),
    },
    { status: 200 }
  );
}
