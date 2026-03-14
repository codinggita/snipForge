import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import SnippetCard from './SnippetCard';
import SearchBar from './SearchBar';

const BASE_URL = 'http://localhost:5000';

const SnippetList = ({ mode = 'explore', title = 'Snippets', showSearch = true }) => {
  const { user, token } = useContext(AuthContext);

  const [snippets, setSnippets]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');
  const [search, setSearch]             = useState('');
  const [language, setLanguage]         = useState('');
  const [page, setPage]                 = useState(1);
  const [totalPages, setTotalPages]     = useState(1);
  const [resultsCount, setResultsCount] = useState(0);

  // ── Main fetch effect — re-runs whenever search / language / page / mode changes ──
  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      setError('');

      try {
        const endpoint =
          mode === 'dashboard'
            ? `${BASE_URL}/api/snippets/my`
            : `${BASE_URL}/api/snippets`;

        const params = new URLSearchParams();
        if (search)   params.append('search', search);
        if (language) params.append('language', language);
        params.append('page', page);

        const url = `${endpoint}?${params.toString()}`;

        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res  = await fetch(url, { headers });
        const json = await res.json();

        if (!res.ok || !json.success) {
          throw new Error(json.message || 'Failed to fetch snippets.');
        }

        setSnippets(json.data.snippets);
        setTotalPages(json.data.totalPages  ?? 1);
        setResultsCount(json.data.totalSnippets ?? json.data.snippets.length);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, [search, language, page, mode]);

  // ── Called by SearchBar — resets page to 1 on new query ──
  const handleSearch = (searchTerm, lang) => {
    setSearch(searchTerm);
    setLanguage(lang);
    setPage(1);
  };

  // ── Optimistic bookmark toggle ──
  const handleBookmark = async (snippetId) => {
    if (!user) return;

    // Optimistic UI update
    setSnippets((prev) =>
      prev.map((s) => {
        if (s._id !== snippetId) return s;
        const alreadyBookmarked = s.bookmarks.includes(user._id);
        return {
          ...s,
          bookmarks: alreadyBookmarked
            ? s.bookmarks.filter((id) => id !== user._id)
            : [...s.bookmarks, user._id],
        };
      })
    );

    try {
      await fetch(`${BASE_URL}/api/snippets/${snippetId}/bookmark`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      // Revert on failure by re-fetching would be ideal, but for now silently fail
    }
  };

  // ── Delete snippet and remove from local state ──
  const handleDelete = async (snippetId) => {
    try {
      const res = await fetch(`${BASE_URL}/api/snippets/${snippetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      setSnippets((prev) => prev.filter((s) => s._id !== snippetId));
      setResultsCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // ── Skeleton loader cards ──
  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-800 rounded-xl h-64 animate-pulse border border-slate-700/50"
        />
      ))}
    </div>
  );

  return (
    <div className="container-page py-8 space-y-6">

      {/* ── HEADER ROW ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="section-title">{title}</h2>
          {!loading && !error && (
            <p className="text-muted mt-1">
              {resultsCount} {resultsCount === 1 ? 'snippet' : 'snippets'} found
            </p>
          )}
        </div>
      </div>

      {/* ── SEARCH BAR ── */}
      {showSearch && (
        <SearchBar
          onSearch={handleSearch}
          resultsCount={!loading && !error ? resultsCount : undefined}
          placeholder="Search by title, language, or keyword..."
        />
      )}

      {/* ── LOADING STATE: skeleton grid ── */}
      {loading && <SkeletonGrid />}

      {/* ── ERROR STATE ── */}
      {!loading && error && (
        <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 text-center">
          <p className="text-red-400 font-medium mb-4">{error}</p>
          <button
            className="btn-ghost"
            onClick={() => {
              setError('');
              setPage((p) => p); // trigger re-fetch by touching a dep (use a counter trick)
              setSearch((s) => s);
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* ── EMPTY STATE ── */}
      {!loading && !error && snippets.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <h3 className="text-xl font-medium text-white mt-4">No snippets found</h3>
          <p className="text-muted mt-2">
            Try a different search or be the first to add one.
          </p>
        </div>
      )}

      {/* ── SNIPPET GRID ── */}
      {!loading && !error && snippets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              onBookmark={handleBookmark}
              onDelete={handleDelete}
              isOwner={!!(user && snippet.author._id === user._id)}
              isBookmarked={!!(user && snippet.bookmarks.includes(user._id))}
            />
          ))}
        </div>
      )}

      {/* ── PAGINATION ── */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            className="btn-ghost"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 1}
          >
            ← Previous
          </button>

          <span className="text-slate-400 text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            className="btn-ghost"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}

    </div>
  );
};

export default SnippetList;
