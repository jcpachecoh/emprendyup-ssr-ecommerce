import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const GET_BLOG_POST_QUERY = `
  query GetPost($idOrSlug: String!) { 
    getPost(idOrSlug: $idOrSlug) { 
      id 
      title
      slug
      excerpt 
      content 
      status 
      createdAt
      updatedAt
      publishedAt
      creator { 
        id 
        name 
        email 
      } 
      blogCategory { 
        id 
        name 
        slug 
      } 
      tags { 
        tag { 
          id 
          name 
          slug 
        } 
      } 
      relatedPosts { 
        id 
        title 
        slug 
      } 
      coverImageUrl 
    } 
  }
`;

async function fetchBlogPost(slug: string) {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_BLOG_POST_QUERY,
        variables: { idOrSlug: slug },
      }),
      next: { revalidate: 60 },
    });

    const json = await resp.json();
    return json?.data?.getPost;
  } catch (error) {
    console.error('Error fetching blog post for metadata:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const post = await fetchBlogPost(resolvedParams.slug);

    if (!post) {
      return {
        title: 'Blog no encontrado | EmprendyUp',
        description: 'El artículo que buscas no está disponible.',
      };
    }

    // Generar descripción a partir del excerpt o contenido
    const description = post.excerpt
      ? post.excerpt.substring(0, 160)
      : post.content
        ? post.content.replace(/<[^>]*>/g, '').substring(0, 160) // Remover HTML tags
        : 'Descubre consejos y estrategias para emprendedores en nuestro blog de EmprendyUp.';

    // Generar keywords a partir de tags y categoría
    const keywords = [
      'emprendimiento',
      'negocios',
      'startup',
      'emprendedores',
      ...(post.tags?.map((tag: any) => tag.tag?.name).filter(Boolean) || []),
      ...(post.blogCategory?.name ? [post.blogCategory.name] : []),
    ];

    // URL de imagen
    const imageUrl = post.coverImageUrl
      ? post.coverImageUrl.startsWith('http')
        ? post.coverImageUrl
        : `https://emprendyup-images.s3.us-east-1.amazonaws.com/${post.coverImageUrl}`
      : '/images/blog/default-blog.jpg';

    const title = `${post.title} | Blog EmprendyUp`;
    const canonicalUrl = `https://www.emprendyup.com/blog-detalle/${resolvedParams.slug}`;

    // Datos estructurados para artículo
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: description,
      image: imageUrl,
      author: {
        '@type': 'Person',
        name: post.creator?.name || 'EmprendyUp',
        email: post.creator?.email,
      },
      publisher: {
        '@type': 'Organization',
        name: 'EmprendyUp',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.emprendyup.com/images/logo-dark.png',
        },
      },
      datePublished: post.publishedAt || post.createdAt,
      dateModified: post.updatedAt,
      url: canonicalUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
    };

    return {
      title,
      description,
      keywords: keywords.join(', '),
      authors: [
        {
          name: post.creator?.name || 'EmprendyUp',
          url: 'https://www.emprendyup.com',
        },
      ],
      openGraph: {
        title,
        description,
        type: 'article',
        url: canonicalUrl,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        siteName: 'EmprendyUp',
        publishedTime: post.publishedAt || post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [post.creator?.name || 'EmprendyUp'],
        section: post.blogCategory?.name || 'Emprendimiento',
        tags: post.tags?.map((tag: any) => tag.tag?.name).filter(Boolean) || [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
        creator: '@emprendyup',
        site: '@emprendyup',
      },
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: post.status === 'PUBLISHED',
        follow: true,
      },
      other: {
        'article:published_time': post.publishedAt || post.createdAt,
        'article:modified_time': post.updatedAt,
        'article:author': post.creator?.name || 'EmprendyUp',
        'article:section': post.blogCategory?.name || 'Emprendimiento',
        'article:tag': post.tags?.map((tag: any) => tag.tag?.name).join(',') || '',
        'structured-data': JSON.stringify(structuredData),
      },
    };
  } catch (error) {
    console.error('Error generating blog metadata:', error);
    return {
      title: 'Blog | EmprendyUp',
      description: 'Consejos, estrategias y recursos para emprendedores exitosos.',
    };
  }
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
