// src/pages/Blog.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || ''; // '' works if frontend served from same origin

function BlogCard({ blog }) {
  const truncate = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  // use either blog.excerpt or first section, but truncate it
  const excerpt = truncate(
    blog.excerpt || (blog.sections && blog.sections[0]?.body) || "",
    140
  );
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/blog/${blog.slug}`}>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {blog.title}
        </h1>
      </Link>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {excerpt}
      </p>

      <Link
        to={`/blog/${blog.slug}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </Link>
    </div>
  );
}

function Pagination({ page, pages, onPageChange }) {
  if (!pages || pages <= 1) return null;

  // build page list (simple version). You can improve with ellipsis if you want.
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation example" className="mt-6">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="Previous"
          >
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>

        {pageNumbers.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={
                p === page
                  ? 'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }
            >
              {p}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(Math.min(pages, page + 1))}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            aria-label="Next"
          >
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [blogs, setBlogs] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    axios
      .get(`${API}/api/blogs?page=${pageParam}&limit=12`)
      .then((res) => {
        if (cancelled) return;
        setBlogs(res.data.blogs || []);
        setPages(res.data.pages || 1);
      })
      .catch((err) => {
        console.error('Failed to load blogs', err);
        if (!cancelled) setBlogs([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pageParam]);

  function onPageChange(p) {
    setSearchParams({ page: String(p) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Blog</h2>

      {loading ? (
        <p>Loading posts…</p>
      ) : blogs.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <BlogCard blog={b} key={b._id} />
            ))}
          </div>

          <Pagination page={pageParam} pages={pages} onPageChange={onPageChange} />
        </>
      )}
    </div>
  );
}
