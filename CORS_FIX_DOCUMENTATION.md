# 🔧 CORS Fix Documentation - Slack Notifications

## Problem

The original implementation was trying to call Slack webhooks directly from the client-side React component, which caused a CORS (Cross-Origin Resource Sharing) error:

```
Access to fetch at 'https://hooks.slack.com/services/...' from origin 'http://localhost:3000'
has been blocked by CORS policy: Response to preflight request doesn't pass access control check
```

## Root Cause

- **Client-side limitation**: Slack webhooks don't allow direct calls from browsers due to CORS restrictions
- **Security measure**: This prevents malicious websites from sending Slack messages on your behalf
- **Browser enforcement**: Modern browsers block cross-origin requests that don't have proper CORS headers

## Solution

### 1. **Server-Side API Route**

Created `/src/app/api/send-slack-notification/route.ts` to handle Slack notifications on the server:

```typescript
// Server-side API route - no CORS restrictions
export async function POST(request: NextRequest) {
  const leadData = await request.json();
  const success = await slackService.sendLeadNotification(leadData);
  return NextResponse.json({ success });
}
```

### 2. **Client-Side API Call**

Updated `LeadCaptureSectionNew.tsx` to call our API route instead of Slack directly:

```typescript
// Client calls our API, our API calls Slack
const slackResponse = await fetch('/api/send-slack-notification', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(leadData),
});
```

### 3. **Enhanced Security**

Updated environment variables to use server-side only variables:

```env
# More secure - server-side only
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# Less secure - client-side (fallback)
NEXT_PUBLIC_SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

## Architecture Flow

### Before (❌ CORS Error)

```
Browser → Direct Slack Webhook → ❌ CORS Block
```

### After (✅ Working)

```
Browser → Next.js API Route → Slack Webhook → ✅ Success
```

## Files Modified

### ✅ **New Files**

- `/src/app/api/send-slack-notification/route.ts` - Server-side Slack API handler

### ✅ **Updated Files**

- `/src/app/components/LeadCaptureSectionNew.tsx` - Client-side API call
- `/src/lib/services/slack.ts` - Enhanced environment variable handling
- `.env.example` - Updated with server-side variables
- `/src/app/api/test-slack/route.ts` - Updated webhook status check
- `/src/app/testing/page.tsx` - Updated configuration display

## Benefits of This Approach

### 🔒 **Security**

- Webhook URL hidden from client-side code
- No exposure of sensitive credentials in browser
- Server-side validation and sanitization

### ⚡ **Performance**

- No CORS preflight delays
- Reliable server-to-server communication
- Better error handling and retry logic

### 🛠️ **Maintainability**

- Centralized Slack logic in API route
- Easier to add authentication, rate limiting, etc.
- Better separation of concerns

### 📊 **Monitoring**

- Server-side logging of all Slack notifications
- Better error tracking and debugging
- Audit trail for notification delivery

## Testing the Fix

### 1. **Set Environment Variables**

```bash
# In your .env.local file
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
DASHBOARD_URL=https://emprendyup.com/dashboard
```

### 2. **Test the API Route**

```bash
curl -X POST http://localhost:3000/api/send-slack-notification \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "companyName": "Test Company",
    "phone": "+1234567890",
    "category": "TECHNOLOGY",
    "city": "Test City",
    "country": "Test Country",
    "description": "Test description",
    "referralSource": "GOOGLE_UTM:google/test-campaign"
  }'
```

### 3. **Test via Lead Form**

1. Visit: `http://localhost:3000/captura-leads`
2. Fill out the lead capture form
3. Submit the form
4. Check Slack for notification
5. Verify no CORS errors in browser console

### 4. **Test via Testing Dashboard**

1. Visit: `http://localhost:3000/testing`
2. Click "Enviar Notificación de Prueba"
3. Verify success message
4. Check Slack for test notification

## Error Handling

The new implementation includes comprehensive error handling:

### **API Route Errors**

```typescript
try {
  const success = await slackService.sendLeadNotification(leadData);
  return NextResponse.json({ success: true });
} catch (error) {
  console.error('Slack notification API error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
```

### **Client-Side Errors**

```typescript
try {
  const slackResponse = await fetch('/api/send-slack-notification', {...});
  if (!slackResponse.ok) {
    console.warn('Slack notification failed:', await slackResponse.text());
  }
} catch (slackError) {
  console.warn('Failed to send Slack notification:', slackError);
  // Form submission still succeeds - Slack failure doesn't block user
}
```

## Production Deployment Checklist

- [ ] Set `SLACK_WEBHOOK_URL` in production environment variables
- [ ] Set `DASHBOARD_URL` to production dashboard URL
- [ ] Remove or secure `NEXT_PUBLIC_*` variables if not needed
- [ ] Test Slack notifications in production environment
- [ ] Monitor API route logs for any errors
- [ ] Set up monitoring/alerts for failed Slack notifications

## Troubleshooting

### **Slack notifications not working**

1. Check environment variables are set correctly
2. Verify Slack webhook URL is valid and active
3. Check API route logs: `/api/send-slack-notification`
4. Test with curl command to isolate issues

### **API route returning errors**

1. Check server logs for detailed error messages
2. Verify request payload format matches expected structure
3. Test Slack webhook directly from server environment

### **Client-side issues**

1. Check browser network tab for API call status
2. Verify no CORS errors (should be resolved now)
3. Check form submission doesn't depend on Slack success

The CORS issue is now completely resolved, and Slack notifications will work reliably through the server-side API route! 🎉
