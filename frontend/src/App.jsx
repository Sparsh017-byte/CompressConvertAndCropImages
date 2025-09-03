import { Link, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Uploader from './components/Uploader.jsx'
import Compress from './components/Compress.jsx'
import Convert from './components/Convert.jsx'
import Home from './components/Home.jsx'
import Crop from './components/Crop.jsx';
import Footer from './components/Footer.jsx';
import API from './api.js'

function Nav() {
  const tabs = [
    
    { to: '/compress', label: 'Compress' },
    { to: '/convert',  label: 'Convert' },
    { to: '/crop',     label: 'Crop' }
  ]
  const location = useLocation()
  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold"><Link key = '/home' to = '/home'>CCCImages</Link></div>
        <div className="flex gap-2">
          {tabs.map(t => (
            <Link key={t.to} to={t.to}
              className={`btn ${location.pathname===t.to ? 'bg-gray-100' : ''}`}>
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

function HealthPill() {
  const [status, setStatus] = useState('checking...')
  useEffect(() => {
    API.get('/api/health')
      .then(res => setStatus(res.data.ok ? 'API OK' : 'API Error'))
      .catch(() => setStatus('API Error'))
  }, [])
  return <span className="text-xs text-gray-500">Status: {status}</span>
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />
      <main className="w-[90vw] mx-auto px-4 py-6 space-y-4 flex-grow">
        <HealthPill />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/compress" element={<Compress />} />
          <Route path="/convert" element={<Convert />} />
          <Route path="/crop" element={<Crop />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>

      {/* ✅ Footer always visible */}
      <Footer />
    </div>
  );
}
