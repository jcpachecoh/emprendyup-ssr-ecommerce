# Strapi CMS Integration for EmprendyUp

This document explains how to use the Strapi CMS integration that has been implemented in the EmprendyUp Next.js application.

## 🎯 Overview

The Strapi integration provides a headless CMS solution that allows dynamic content management for:

- Blog posts
- Hero sections
- Testimonials
- Featured content

The implementation includes smart fallbacks to ensure the application works with or without Strapi.

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file in your project root:

```env
# Strapi Configuration
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
STRAPI_TOKEN=your_strapi_api_token_here

# Optional: Control which data sources to use
NEXT_PUBLIC_USE_STRAPI=true
NEXT_PUBLIC_USE_GRAPHQL=true
```

### 2. Install Strapi (Optional)

If you want to run Strapi locally:

```bash
# Create a new Strapi project
npx create-strapi-app@latest emprendyup-cms --quickstart

# Or clone an existing Strapi configuration
git clone <your-strapi-repo> strapi-cms
cd strapi-cms
npm install
npm run develop
```

### 3. Start the Application

The Next.js application will work with or without Strapi:

```bash
npm run dev
```

## 📁 File Structure

```
src/
├── lib/
│   ├── strapiClient.ts       # Core Strapi API client
│   └── blogService.ts        # Smart blog service with fallbacks
├── app/
│   ├── components/
│   │   ├── strapi-hero.tsx   # Strapi-powered hero component
│   │   └── strapi-testimonials.tsx # Strapi-powered testimonials
│   ├── blog/
│   │   └── page.tsx          # Updated blog page using blogService
│   └── blog-detalle/[slug]/
│       └── page.tsx          # Updated blog detail page
└── docs/
    └── strapi-integration.md # Original task documentation
```

## 🔧 API Client Usage

### Basic Strapi Fetch

```typescript
import { fetchFromStrapi } from '@/lib/strapiClient';

// Fetch any Strapi endpoint
const data = await fetchFromStrapi('/api/articles?populate=*');
```

### Blog Posts

```typescript
import { getBlogPosts, getBlogPostBySlug } from '@/lib/blogService';

// Get paginated blog posts (works with Strapi, GraphQL, or static fallback)
const posts = await getBlogPosts({ page: 1, pageSize: 10 });

// Get single blog post by slug
const post = await getBlogPostBySlug('my-blog-post');
```

### Hero Section

```typescript
import { fetchHeroSection } from '@/lib/strapiClient';

// Fetch hero section content
const heroData = await fetchHeroSection();
```

### Testimonials

```typescript
import { fetchTestimonials } from '@/lib/strapiClient';

// Fetch testimonials
const testimonials = await fetchTestimonials(3); // Limit to 3
```

## 🎨 Components

### Strapi Hero Component

```tsx
import StrapiHero from '@/app/components/strapi-hero';

export default function HomePage() {
  return (
    <main>
      <StrapiHero />
      {/* rest of your page */}
    </main>
  );
}
```

### Strapi Testimonials Component

```tsx
import StrapiTestimonials from '@/app/components/strapi-testimonials';

export default function HomePage() {
  return (
    <main>
      <StrapiTestimonials limit={3} title="Custom Title" subtitle="Custom Subtitle" />
    </main>
  );
}
```

## 📊 Data Flow & Fallbacks

The integration uses a smart fallback system:

```
1. Strapi CMS (if enabled and available)
   ↓ (on error)
2. GraphQL API (existing system)
   ↓ (on error)
3. Static Data (development/emergency fallback)
```

### Configuration Options

```typescript
// Control data sources via environment variables
NEXT_PUBLIC_USE_STRAPI = true; // Enable Strapi as primary source
NEXT_PUBLIC_USE_GRAPHQL = true; // Enable GraphQL as fallback
NODE_ENV = development; // Enable static fallback in development
```

## 🏗️ Strapi Content Types

To use this integration, create these content types in your Strapi admin:

### Blog Post Content Type (`blog-post`)

```json
{
  "title": "Text (required)",
  "slug": "UID (required)",
  "excerpt": "Text",
  "content": "Rich Text (required)",
  "publishedAt": "DateTime",
  "author": "Relation (User)",
  "category": "Relation (Category)",
  "tags": "Relation (Tags)",
  "featuredImage": "Media",
  "seo": {
    "metaTitle": "Text",
    "metaDescription": "Text",
    "keywords": "Text"
  },
  "readTime": "Number"
}
```

### Hero Section Content Type (`hero-section`)

```json
{
  "title": "Text (required)",
  "subtitle": "Text",
  "description": "Text (required)",
  "primaryButtonText": "Text",
  "primaryButtonUrl": "Text",
  "secondaryButtonText": "Text",
  "secondaryButtonUrl": "Text",
  "backgroundImage": "Media",
  "heroImage": "Media"
}
```

### Testimonials Content Type (`testimonial`)

```json
{
  "name": "Text (required)",
  "role": "Text",
  "company": "Text",
  "content": "Text (required)",
  "avatar": "Media",
  "rating": "Number (1-5)"
}
```

## 🔄 Migration from Existing System

### Blog Pages

The blog pages have been updated to use the new `blogService` which provides:

- ✅ Backward compatibility with existing GraphQL API
- ✅ Strapi integration as primary source
- ✅ Static fallback for development
- ✅ Consistent `BlogPost` interface

### Component Updates

Replace static content with Strapi components:

```tsx
// Before
<Hero title="Static Title" />

// After
<StrapiHero />
```

## 🛠️ Development

### Adding New Content Types

1. Create content type in Strapi admin
2. Add fetch function to `strapiClient.ts`:

```typescript
export async function fetchMyContent() {
  const endpoint = '/api/my-content-type?populate=*';
  return fetchFromStrapi(endpoint);
}
```

3. Create component that uses the fetch function
4. Add fallback content for when Strapi is unavailable

### Custom Strapi Fields

Handle complex Strapi fields:

```typescript
// Media fields
const imageUrl = getStrapiMediaUrl(data.image?.data?.attributes?.url);

// Relation fields
const categoryName = data.category?.data?.attributes?.name;

// Component fields
const seoTitle = data.seo?.metaTitle;
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Configure Strapi CORS settings
2. **Token Issues**: Ensure `STRAPI_TOKEN` is set correctly
3. **404 Errors**: Check Strapi API endpoints and content type names
4. **Image Loading**: Verify media URLs and Strapi media settings

### Debug Mode

Enable debug logging:

```typescript
// Add to strapiClient.ts
console.log('Fetching from Strapi:', url);
console.log('Response:', await res.json());
```

### Fallback Testing

Test fallback behavior:

```bash
# Test without Strapi
NEXT_PUBLIC_USE_STRAPI=false npm run dev

# Test without GraphQL
NEXT_PUBLIC_USE_GRAPHQL=false npm run dev
```

## 📈 Performance

### Caching Strategy

- Next.js ISR with 60-second revalidation
- Strapi responses cached at CDN level
- Static fallbacks cached indefinitely

### Optimization Tips

1. Use `populate=*` sparingly for better performance
2. Implement specific field selection: `?fields[0]=title&fields[1]=slug`
3. Use Strapi's built-in pagination
4. Consider implementing client-side caching for non-critical data

## 🔒 Security

### API Tokens

- Use server-side only tokens for sensitive operations
- Set appropriate token permissions in Strapi
- Never expose admin tokens in client-side code

### Content Validation

```typescript
// Validate Strapi responses
function validateBlogPost(post: any): boolean {
  return post?.attributes?.title && post?.attributes?.content;
}
```

## 🚀 Deployment

### Environment Variables

Set these in your production environment:

```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-instance.com
STRAPI_TOKEN=your_production_token
NEXT_PUBLIC_USE_STRAPI=true
```

### Strapi Deployment

Deploy Strapi separately from Next.js:

- Database (PostgreSQL/MySQL for production)
- File storage (AWS S3, Cloudinary, etc.)
- CDN for media delivery

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Next.js ISR Documentation](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration)
- [EmprendyUp API Documentation](./api-documentation.md)

---

**Note**: This integration maintains full backward compatibility. The application will continue to work with the existing GraphQL API and static content even if Strapi is not available.
