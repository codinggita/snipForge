import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SnippetList from '../components/SnippetList';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalSnippets: 0, totalBookmarks: 0, languages: [] });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/snippets/my/stats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const json = await res.json();
        
        if (res.ok && json.success && json.data) {
          setStats(json.data);
        }
      } catch (err) {
        // Silently fail stats display if there's an error
      } finally {
        setStatsLoading(false);
      }
    };
    
    if (token) {
      fetchStats();
    }
  }, [token]);

  return (
    <div>
      {/* ── HEADER & STATS ── */}
      <div className="container-page py-8">
        
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-400 text-sm">Welcome back,</p>
            <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
          </div>
          <Link to="/create" className="btn-primary">
            + New Snippet
          </Link>
        </div>

        {/* ── STATS CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          {statsLoading ? (
            <>
              <div className="animate-pulse bg-slate-800 rounded-xl h-24" />
              <div className="animate-pulse bg-slate-800 rounded-xl h-24" />
              <div className="animate-pulse bg-slate-800 rounded-xl h-24" />
            </>
          ) : (
            <>
              <div className="card text-center">
                <div className="text-3xl font-bold text-indigo-400">{stats.totalSnippets}</div>
                <div className="text-slate-400 text-sm mt-1">My Snippets</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-indigo-400">{stats.totalBookmarks}</div>
                <div className="text-slate-400 text-sm mt-1">Bookmarked</div>
              </div>
              <div className="card text-center">
                <div className="text-3xl font-bold text-indigo-400">
                  {stats.languages ? stats.languages.length : 0}
                </div>
                <div className="text-slate-400 text-sm mt-1">Languages Used</div>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-slate-700/50 mt-8" />
      </div>

      {/* ── SNIPPET LIST (Dashboard Mode) ── */}
      <SnippetList mode="dashboard" title="My Snippets" showSearch={true} />
    </div>
  );
};

export default Dashboard;
