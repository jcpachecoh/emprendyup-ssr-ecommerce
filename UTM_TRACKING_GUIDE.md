# 🎯 UTM Tracking & Auto-Prefill Documentation

## Overview

The LeadCaptureSectionNew component now automatically extracts UTM parameters from the URL and prefills the "¿Cómo nos encontraste?" (referral source) field based on the UTM data. This maintains the same payload structure without adding extra fields to the database.

## How It Works

### 1. UTM Parameter Extraction

The component automatically extracts UTM parameters from the URL using these sources:

- **Props**: If `utmData` is passed as props
- **URL Parameters**: Direct extraction from `useSearchParams()`
- **localStorage**: Fallback for tracking across sessions

### 2. UTM to Referral Source Mapping

| UTM Source                                               | UTM Medium                 | Mapped Referral | Description                |
| -------------------------------------------------------- | -------------------------- | --------------- | -------------------------- |
| `google`                                                 | any                        | `GOOGLE`        | Google Ads, Google Organic |
| `facebook`, `instagram`, `linkedin`, `twitter`, `tiktok` | any                        | `SOCIAL_MEDIA`  | Social media platforms     |
| any                                                      | `social`                   | `SOCIAL_MEDIA`  | Social media campaigns     |
| `email`, `newsletter`                                    | any                        | `OTHER`         | Email marketing            |
| any                                                      | `email`                    | `OTHER`         | Email campaigns            |
| any                                                      | `cpc`, `display`, `banner` | `ADVERTISEMENT` | Paid advertising           |
| `ads`, `advertisement`                                   | any                        | `ADVERTISEMENT` | Advertisement sources      |
| `event`, `conference`, `meetup`                          | any                        | `EVENT`         | Events and conferences     |
| `referral`, `friend`                                     | any                        | `FRIEND`        | Referrals                  |
| any                                                      | `referral`                 | `FRIEND`        | Referral campaigns         |
| **Default**                                              | any                        | `OTHER`         | Unknown sources            |

### 3. Enhanced Referral Source Storage

The component creates an enhanced referral source that includes UTM context:

**Format**: `{MAPPED_SOURCE}_UTM:{utm_source}/{utm_campaign}`

**Examples**:

- `GOOGLE_UTM:google/spring-campaign-2024`
- `SOCIAL_MEDIA_UTM:facebook/entrepreneurs-fb`
- `ADVERTISEMENT_UTM:google/emprendedores-ads`

## Usage Examples

### Example 1: Google Ads Campaign

```
URL: /captura-leads?utm_source=google&utm_medium=cpc&utm_campaign=emprendedores-2024&utm_term=crear-tienda-online

Auto-filled:
- Referral Source: "Google" (in the dropdown)
- Stored as: "GOOGLE_UTM:google/emprendedores-2024"
```

### Example 2: Facebook Social Campaign

```
URL: /captura-leads?utm_source=facebook&utm_medium=social&utm_campaign=entrepreneurs-fb

Auto-filled:
- Referral Source: "Redes Sociales" (in the dropdown)
- Stored as: "SOCIAL_MEDIA_UTM:facebook/entrepreneurs-fb"
```

### Example 3: Email Newsletter

```
URL: /captura-leads?utm_source=newsletter&utm_medium=email&utm_campaign=monthly-newsletter

Auto-filled:
- Referral Source: "Otro" (in the dropdown)
- Stored as: "OTHER_UTM:newsletter/monthly-newsletter"
```

## Database Payload

The component maintains the **same database structure** - no extra UTM fields are added:

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "companyName": "Mi Emprendimiento",
  "phone": "+573001234567",
  "category": "TECHNOLOGY",
  "city": "Bogotá",
  "country": "Colombia",
  "description": "Descripción del negocio...",
  "referralSource": "GOOGLE_UTM:google/emprendedores-2024",
  "website": "https://miempresa.com"
}
```

## Benefits

### 1. **Same Payload Structure**

- No database schema changes required
- Backward compatible with existing systems
- No extra UTM fields cluttering the database

### 2. **Enhanced Tracking**

- UTM context preserved in referral source
- Campaign performance tracking through referral data
- Attribution tracking without complex joins

### 3. **User Experience**

- Automatic form prefilling improves conversion
- Reduces user friction
- Better data quality

### 4. **Analytics Integration**

- Slack notifications include UTM data
- Google Analytics tracks UTM parameters
- Complete attribution chain maintained

## Testing URLs

Test the UTM tracking with these example URLs:

### Google Ads

```
http://localhost:3000/captura-leads?utm_source=google&utm_medium=cpc&utm_campaign=emprendedores-2024&utm_term=crear-tienda-online&utm_content=anuncio-principal
```

### Facebook Ads

```
http://localhost:3000/captura-leads?utm_source=facebook&utm_medium=social&utm_campaign=emprendedores-facebook&utm_content=carousel-video
```

### Email Marketing

```
http://localhost:3000/captura-leads?utm_source=newsletter&utm_medium=email&utm_campaign=newsletter-mensual&utm_content=cta-principal
```

### LinkedIn Ads

```
http://localhost:3000/captura-leads?utm_source=linkedin&utm_medium=social&utm_campaign=emprendedores-b2b&utm_content=sponsored-post
```

## Visual Feedback

The `UTMTracker` component shows:

- ✅ Detected UTM parameters
- 🎯 Mapped referral source
- 📊 Final stored value
- 🔍 Real-time tracking status

## Code Implementation

### Key Functions

```typescript
// UTM to referral mapping
const mapUTMToReferralSource = (utmSource: string, utmMedium?: string): string => {
  // Mapping logic here
};

// Auto-prefill form field
useEffect(() => {
  if (currentUtmData.utm_source) {
    const mappedReferralSource = mapUTMToReferralSource(
      currentUtmData.utm_source,
      currentUtmData.utm_medium
    );
    setValue('referralSource', mappedReferralSource);
  }
}, [utmData, searchParams, setValue]);

// Enhanced referral source with UTM context
let referralSourceWithContext = formData.referralSource;
if (extractedUtmData?.utm_source && extractedUtmData?.utm_campaign) {
  const utmContext = `${extractedUtmData.utm_source}/${extractedUtmData.utm_campaign}`;
  referralSourceWithContext = `${formData.referralSource}_UTM:${utmContext}`;
}
```

## Analytics & Reporting

### Campaign Performance Analysis

Query the database by referral source patterns:

```sql
SELECT
  SUBSTRING_INDEX(referralSource, '_UTM:', 1) as source_type,
  SUBSTRING_INDEX(SUBSTRING_INDEX(referralSource, '_UTM:', -1), '/', 1) as utm_source,
  SUBSTRING_INDEX(referralSource, '/', -1) as campaign,
  COUNT(*) as lead_count
FROM entrepreneurs
WHERE referralSource LIKE '%_UTM:%'
GROUP BY source_type, utm_source, campaign;
```

### Top Performing Campaigns

```sql
SELECT
  SUBSTRING_INDEX(referralSource, '/', -1) as campaign_name,
  COUNT(*) as leads,
  category
FROM entrepreneurs
WHERE referralSource LIKE '%_UTM:%'
GROUP BY campaign_name, category
ORDER BY leads DESC;
```

## Integration Points

### 1. **Slack Notifications**

- Include UTM data in Slack messages
- Campaign attribution in team notifications
- Real-time lead source tracking

### 2. **Google Analytics**

- Track conversion events with UTM context
- Attribution modeling
- Campaign ROI measurement

### 3. **CRM Integration**

- Enhanced lead scoring based on source
- Campaign-specific follow-up workflows
- Attribution reporting

## Best Practices

### 1. **UTM Parameter Naming**

- Use consistent naming conventions
- Include campaign dates when relevant
- Use descriptive campaign names

### 2. **Referral Source Management**

- Regularly review referral source mappings
- Update mapping logic for new traffic sources
- Monitor unmapped sources (defaulting to 'OTHER')

### 3. **Data Analysis**

- Set up regular campaign performance reports
- Track conversion rates by UTM source
- A/B test different UTM strategies

This implementation provides seamless UTM tracking while maintaining database simplicity and enhancing user experience through intelligent form prefilling.
