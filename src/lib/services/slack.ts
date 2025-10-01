interface SlackMessage {
  text?: string;
  blocks?: any[];
  username?: string;
  icon_emoji?: string;
}

interface LeadData {
  name: string;
  email: string;
  companyName: string;
  phone: string;
  category: string;
  city: string;
  country: string;
  description: string;
  referralSource: string;
  website?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

class SlackService {
  private webhookUrl: string;
  private dashboardUrl: string;

  constructor() {
    // Use server-side only environment variable for security
    this.webhookUrl =
      process.env.SLACK_WEBHOOK_URL || process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || '';
    this.dashboardUrl =
      process.env.DASHBOARD_URL ||
      process.env.NEXT_PUBLIC_DASHBOARD_URL ||
      'https://emprendyup.com/dashboard';
  }

  async sendLeadNotification(leadData: LeadData): Promise<boolean> {
    if (!this.webhookUrl) {
      console.warn('Slack webhook URL not configured');
      return false;
    }

    try {
      const message = this.formatLeadMessage(leadData);

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        console.log('✅ Lead notification sent to Slack successfully');
        return true;
      } else {
        console.error('❌ Failed to send Slack notification:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('❌ Error sending Slack notification:', error);
      return false;
    }
  }

  private formatLeadMessage(data: LeadData): SlackMessage {
    const utmInfo = data.utm_source
      ? `\n*UTM Source:* ${data.utm_source}${data.utm_medium ? ` | *Medium:* ${data.utm_medium}` : ''}${data.utm_campaign ? ` | *Campaign:* ${data.utm_campaign}` : ''}`
      : '';

    return {
      username: 'EmprendyUp Bot',
      icon_emoji: ':rocket:',
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎯 Nuevo Lead Registrado!',
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Nombre:*\n${data.name}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${data.email}`,
            },
            {
              type: 'mrkdwn',
              text: `*Empresa:*\n${data.companyName}`,
            },
            {
              type: 'mrkdwn',
              text: `*Teléfono:*\n${data.phone}`,
            },
            {
              type: 'mrkdwn',
              text: `*Categoría:*\n${data.category}`,
            },
            {
              type: 'mrkdwn',
              text: `*Ubicación:*\n${data.city}, ${data.country}`,
            },
          ],
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Descripción del Negocio:*\n${data.description}`,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Cómo nos encontró:*\n${data.referralSource}`,
            },
            ...(data.website
              ? [
                  {
                    type: 'mrkdwn',
                    text: `*Website:*\n${data.website}`,
                  },
                ]
              : []),
          ],
        },
        ...(utmInfo
          ? [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: `*Información de Tracking:*${utmInfo}`,
                },
              },
            ]
          : []),
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `📅 Registrado: ${new Date().toLocaleString('es-ES')} | 🌐 EmprendyUp Platform`,
            },
          ],
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '📧 Contactar Lead',
                emoji: true,
              },
              style: 'primary',
              url: `mailto:${data.email}?subject=Bienvenido a EmprendyUp - ${data.name}&body=Hola ${data.name}, gracias por tu interés en EmprendyUp...`,
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '💼 Ver Dashboard',
                emoji: true,
              },
              url: process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://emprendyup.com/dashboard',
            },
          ],
        },
      ],
    };
  }

  async sendTestNotification(): Promise<boolean> {
    const testData: LeadData = {
      name: 'Test User',
      email: 'test@emprendyup.com',
      companyName: 'Test Company',
      phone: '+57 300 123 4567',
      category: 'TECHNOLOGY',
      city: 'Bogotá',
      country: 'Colombia',
      description: 'Esta es una notificación de prueba del sistema de leads.',
      referralSource: 'TESTING',
      utm_source: 'test',
      utm_medium: 'slack',
      utm_campaign: 'test-notification',
    };

    return this.sendLeadNotification(testData);
  }
}

export const slackService = new SlackService();
export type { LeadData };
