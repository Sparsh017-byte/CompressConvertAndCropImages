// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from "react-markdown";
import './BlogDetail.css';

const API = import.meta.env.VITE_API_URL || '';

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    axios
      .get(`${API}/api/blogs/${slug}`)
      .then((res) => {
        if (!cancelled) setBlog(res.data);
      })
      .catch((err) => {
        console.error('Failed to load blog', err);
        if (!cancelled) setBlog(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) return <p>Loading…</p>;
  if (!blog) return <p>Post not found.</p>;

  return (
    <article className="prose lg:prose-xl dark:prose-invert max-w-none">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">{blog.title}</h1>
      {blog.excerpt && <p className="text-gray-600 dark:text-gray-300">{blog.excerpt}</p>}

      {blog.sections?.map((s, i) => (
        <section key={i} className="mt-6">
          {s.heading && <h2 className="text-xl font-semibold">{s.heading}</h2>}
          <div className="blog-content">
            <ReactMarkdown className="prose dark:prose-invert">
              {s.body}
            </ReactMarkdown>
          </div>
        </section>
      ))}

      <div className="mt-8">
        <Link to={-1} className="text-blue-600">← Back</Link>
      </div>
    </article>
  );
}
