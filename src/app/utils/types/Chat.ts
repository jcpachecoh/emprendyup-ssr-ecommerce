interface ChatMessage {
  role?: 'user' | 'bot';
  message?: string;
  history?: ChatMessage[];
  parts?: string[];
}

interface ChatResponse {
  response: string;
  follow_up?: string;
  quick_replies?: Array<{ title: string; payload: string }>;
}
