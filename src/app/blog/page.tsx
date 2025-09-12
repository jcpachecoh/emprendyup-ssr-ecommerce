import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Switcher from '../components/switcher';

import { blogData } from '../data/data';
// import { blogPosts } from '../data/blogData';
// server-side fetch for paginated posts

import { FiCalendar, FiClock, FiChevronLeft, FiChevronRight } from '../assets/icons/vander';
import ScrollToTop from '../components/scroll-to-top';

export default async function Blogs(props: any) {
  const searchParams = props?.searchParams as { page?: string } | undefined;
  const page = parseInt((searchParams?.page as string) || '1', 10) || 1;
  const pageSize = 9;

  const query = `query ListPostsPaginated($categoryId: String, $page: Int, $pageSize: Int) { 
    listPostsPaginated(categoryId: $categoryId, page: $page, pageSize: $pageSize) { 
      items { 
        id 
        title 
        slug 
        excerpt 
        content 
        status 
        createdAt 
        updatedAt 
        publishedAt 
        creator { id name email } 
        blogCategory { id name slug } 
        tags { tag { id name slug } } 
        relatedPosts { id title slug } 
        coverImageUrl 
      } 
      total 
      page 
      pageSize 
      totalPages 
      hasNextPage 
      hasPrevPage 
    } 
  }`;
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';
  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { categoryId: null, page, pageSize } }),
    next: { revalidate: 60 },
  });
  const json = await resp.json();
  const data = json?.data?.listPostsPaginated;
  const items = data?.items || [];
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <section className="relative table w-full items-center py-36 bg-[url('/images/hero/pages.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center mt-10">
            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">
              Blogs / Nuevos
            </h3>
          </div>
        </div>

        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="tracking-[0.5px] mb-0 inline-block">
            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link href="/">EmprendyUp</Link>
            </li>
            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180">
              <i className="mdi mdi-chevron-right"></i>
            </li>
            <li
              className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white"
              aria-current="page"
            >
              Blogs
            </li>
          </ul>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {items.map((item: any, index: number) => (
              <div className="group relative overflow-hidden" key={item.id || index}>
                <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                  <Image
                    src={item.coverImageUrl || '/images/hero/bg4.jpg'}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="group-hover:scale-110 duration-500"
                    alt={item.title}
                  />
                </div>

                <div className="mt-6">
                  <div className="flex mb-4">
                    <span className="flex items-center text-slate-400 text-sm">
                      <FiCalendar className="size-4 text-slate-900 dark:text-white me-1.5"></FiCalendar>
                      {new Date(item.publishedAt || item.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center text-slate-400 text-sm ms-3">
                      <FiClock className="size-4 text-slate-900 dark:text-white me-1.5"></FiClock>5
                      min leyendo
                    </span>
                  </div>

                  <Link
                    href={`/blog-detalle/${item.slug}`}
                    className="title text-lg font-semibold hover:text-fourth-base duration-500 ease-in-out"
                  >
                    {item.title}
                  </Link>
                  <p className="text-slate-400 mt-2">{item.excerpt || ''}</p>

                  <div className="mt-3">
                    <span className="text-slate-400">
                      by{' '}
                      <Link
                        href="/"
                        className="text-slate-900 dark:text-white hover:text-fourth-base dark:hover:text-fourth-base font-medium"
                      >
                        {item.creator?.name || 'EmprendyUp'}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
            <div className="md:col-span-12 text-center">
              <nav aria-label="Page navigation example">
                <ul className="inline-flex items-center -space-x-px">
                  <li>
                    <Link
                      href={`/blog?page=${Math.max(1, page - 1)}`}
                      className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-fourth-base dark:hover:border-fourth-base hover:bg-fourth-base dark:hover:bg-fourth-base"
                    >
                      <FiChevronLeft className="size-5 rtl:rotate-180 rtl:-mt-1"></FiChevronLeft>
                    </Link>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i}>
                      <Link
                        href={`/blog?page=${i + 1}`}
                        className={`size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-fourth-base dark:hover:border-fourth-base hover:bg-fourth-base dark:hover:bg-fourth-base ${
                          i + 1 === page ? 'z-10 text-white bg-fourth-base border-fourth-base' : ''
                        }`}
                      >
                        {i + 1}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href={`/blog?page=${Math.min(totalPages, page + 1)}`}
                      className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-fourth-base dark:hover:border-fourth-base hover:bg-fourth-base dark:hover:bg-fourth-base"
                    >
                      <FiChevronRight className="size-5 rtl:rotate-180 rtl:-mt-1"></FiChevronRight>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
      <Switcher />
      <ScrollToTop />
    </>
  );
}
