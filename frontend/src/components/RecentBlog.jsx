import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "";

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
        {blogs.map((blog) => (
          <div key={blog._id} className="p-6 bg-white border rounded-lg shadow-sm">
            <Link to={`/blog/${blog.slug}`}>
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            </Link>
            <p className="text-gray-600 mb-4">
              {blog.excerpt?.substring(0, 100)}...
            </p>
            <Link
              to={`/blog/${blog.slug}`}
              className="text-blue-600 hover:underline"
            >
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
