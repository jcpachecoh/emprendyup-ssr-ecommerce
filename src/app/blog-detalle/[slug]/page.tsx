import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug } from '@/lib/blogService';
import { social } from '@/app/data/data';
import Switcher from '@/app/components/switcher';
import ScrollToTop from '@/app/components/scroll-to-top';

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogDetailPage({ params }: BlogDetailProps) {
  // Await the params to get the actual values
  const { slug } = await params;

  // Fetch post using the new blog service (supports Strapi + GraphQL fallback)
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Hero */}
      <section className="relative table w-full items-center py-36 bg-[url('/images/hero/pages.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 text-center mt-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>

            <ul className="flex flex-wrap justify-center gap-8 text-white/70 text-sm">
              <li className="flex flex-col items-center gap-1">
                <span className="text-white block font-medium">Autor:</span>
                <span>{post.author}</span>
              </li>
              <li className="flex flex-col items-center gap-1">
                <span className="text-white block font-medium">Fecha:</span>
                <span>{post.date}</span>
              </li>
              <li className="flex flex-col items-center gap-1">
                <span className="text-white block font-medium">Tiempo de lectura:</span>
                <span>{post.readTime}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="absolute bottom-5 left-0 right-0 text-center">
          <ul className="inline-flex items-center gap-2 text-white/70 text-xs uppercase font-bold tracking-wide">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                EmprendyUp
              </Link>
            </li>
            <li>›</li>
            <li className="text-white">Detalle del Blog</li>
          </ul>
        </div>
      </section>

      {/* Contenido */}
      <section className="relative md:py-28 py-20">
        <div className="container grid md:grid-cols-12 gap-12 lg:gap-16">
          {/* Post Content */}
          <div className="lg:col-span-8 md:col-span-7 order-2 md:order-2">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={post.image || '/images/blog/default.jpg'}
                width={650}
                height={400}
                alt={post.imageAlt || post.title}
                className="rounded-lg shadow-lg"
              />
              <div
                className="p-8 md:p-10 lg:p-12 prose prose-lg dark:prose-invert max-w-none leading-relaxed
                           prose-headings:mb-6 prose-headings:mt-8 prose-headings:leading-tight
                           prose-p:mb-6 prose-p:leading-7 prose-p:text-base md:prose-p:text-lg
                           prose-ul:mb-6 prose-ul:space-y-2 prose-ol:mb-6 prose-ol:space-y-2
                           prose-li:leading-6 prose-li:mb-2
                           prose-blockquote:my-8 prose-blockquote:py-4 prose-blockquote:px-6
                           prose-strong:font-semibold prose-em:italic
                           prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
                           prose-pre:my-6 prose-pre:p-4 prose-pre:rounded-lg
                           prose-img:my-8 prose-img:rounded-lg 
                           prose-hr:my-8 prose-hr:border-gray-200 dark:prose-hr:border-gray-700
                           prose-table:my-8
                           [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.8',
                  letterSpacing: '0.01em',
                }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Información del Autor - Diseño limpio */}
            <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/client/05.jpg"
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-full object-cover shadow-md ring-4 ring-fourth-base/20"
                      alt="EmprendyUp"
                    />
                  </div>

                  {/* Información */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {post.author || 'EmprendyUp'}
                        </h3>
                        <p className="text-fourth-base font-medium text-sm mb-3">
                          {post.author || 'Redactor'}
                        </p>
                      </div>

                      {/* Stats compactas */}
                      <div className="flex gap-6 text-center sm:text-right">
                        <div>
                          <div className="text-lg font-bold text-fourth-base">50+</div>
                          <div className="text-xs text-gray-500">Artículos</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-fourth-base">10K+</div>
                          <div className="text-xs text-gray-500">Lectores</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-fourth-base">5</div>
                          <div className="text-xs text-gray-500">Años</div>
                        </div>
                      </div>
                    </div>

                    {/* Redes sociales */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                        Síguenos:
                      </span>
                      {social.map((Item, index) => (
                        <Link
                          key={index}
                          href="#"
                          className="size-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-fourth-base hover:bg-fourth-base/10 transition-colors"
                        >
                          <Item className="h-4 w-4" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <aside className="lg:col-span-4 md:col-span-5 order-2 md:order-2">
            <div className="sticky top-20 space-y-12">
              {/* Blogs Relacionados */}
              <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">
                <h5 className="text-lg font-semibold mb-6 text-center">Blogs Relacionados</h5>
                <div className="space-y-6">
                  {/* Related posts will be implemented later */}
                  <div className="text-center text-slate-400 p-8">
                    <p>Más artículos próximamente...</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Switcher />
      <ScrollToTop />
    </Suspense>
  );
}
