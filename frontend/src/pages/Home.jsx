import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SnippetList from '../components/SnippetList';

const Home = () => {
  const { user } = useContext(AuthContext);

  const handleScrollToExplore = () => {
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* ── HERO SECTION (Logged out users only) ── */}
      {!user && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900/20 py-20 px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-white leading-tight">
              The Developer's <span className="text-indigo-400">Code Library</span>
            </h1>
            <p className="text-xl text-slate-400 mt-4 leading-relaxed">
              Store, discover, and share reusable code snippets. Stop rewriting the same code twice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link to="/signup" className="btn-primary px-8 py-3 text-base">
                Get Started
              </Link>
              <button onClick={handleScrollToExplore} className="btn-ghost px-8 py-3 text-base">
                Explore Snippets
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
              <div className="card hover:-translate-y-1 hover:border-indigo-500/50 transition-all duration-200">
                <div className="text-3xl mb-3">💾</div>
                <h3 className="text-white font-semibold mt-2">Store Snippets</h3>
                <p className="text-slate-400 text-sm mt-1">Save all your reusable code in one place</p>
              </div>
              <div className="card hover:-translate-y-1 hover:border-indigo-500/50 transition-all duration-200">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="text-white font-semibold mt-2">Discover Code</h3>
                <p className="text-slate-400 text-sm mt-1">Explore snippets shared by the community</p>
              </div>
              <div className="card hover:-translate-y-1 hover:border-indigo-500/50 transition-all duration-200">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-white font-semibold mt-2">Search Fast</h3>
                <p className="text-slate-400 text-sm mt-1">Find any snippet instantly by language or keyword</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── EXPLORE SECTION (Always visible) ── */}
      <section id="explore">
        <SnippetList mode="explore" title="Explore Snippets" showSearch={true} />
      </section>
    </div>
  );
};

export default Home;
