# Goal

Integrate Strapi CMS as the headless backend for the EmprendyUp Next.js frontend.
Fetch content dynamically (e.g., blog posts, hero sections, testimonials) and render them using Tailwind components.

# Tech Stack

- Next.js 15 (App Router)
- TailwindCSS
- Strapi v5 (REST or GraphQL)
- TypeScript

# Tasks

1. Create a new file `/lib/strapiClient.ts` that exports helper functions to fetch data from Strapi using environment variables:
   - NEXT_PUBLIC_STRAPI_API_URL
   - STRAPI_TOKEN

2. Add reusable fetch utilities:
   ```ts
   export async function fetchFromStrapi(endpoint: string) {
     const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${endpoint}`, {
       headers: {
         Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
       },
       next: { revalidate: 60 },
     });
     if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
     return res.json();
   }
   ```
