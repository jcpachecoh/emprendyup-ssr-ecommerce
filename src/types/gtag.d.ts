declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date | { [key: string]: any },
      config?: {
        page_title?: string;
        page_location?: string;
        utm_source?: string;
        utm_medium?: string;
        utm_campaign?: string;
        utm_term?: string;
        utm_content?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

export {};
