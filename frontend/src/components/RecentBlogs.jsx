import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "";

function BlogCard({ blog }) {
  const truncate = (text, length) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const excerpt = truncate(
    blog.excerpt || (blog.sections && blog.sections[0]?.body) || "",
    140
  );

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <Link to={`/blog/${blog.slug}`}>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {blog.title}
        </h1>
      </Link>

      <p className="mb-3 font-normal text-gray-700">{excerpt}</p>

      <Link
        to={`/blog/${blog.slug}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
}

export default function RecentBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API}/api/blogs/recent`)
      .then((res) => setBlogs(res.data || []))
      .catch((err) => {
        console.error("Failed to load recent blogs", err);
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading recent blogs…</p>;
  if (!blogs.length) return <p>No recent blogs found.</p>;

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold mb-6">Recent Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b) => (
          <BlogCard blog={b} key={b._id} />
        ))}
      </div>
    </div>
  );
}

