// utils/chatClient.js

export async function sendChat({ history, message }: { history: any[]; message: string }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AGENT_API}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ history, message }),
  });
  return res.json(); // espera { response, follow_up, quick_replies }
}
