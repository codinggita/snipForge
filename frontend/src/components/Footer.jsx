import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative mt-auto border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-3xl pt-16 pb-8 overflow-hidden">
      
      {/* ── AMBIENT GLOWS ── */}
      <div className="absolute top-0 left-1/4 w-[50%] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
      <div className="absolute top-[-50%] right-[-10%] w-[40%] h-[100%] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-page relative z-10">
        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* ── BRANDING COLUMN (col-span-5) ── */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center group-hover:border-indigo-400/50 group-hover:shadow-[0_0_15px_rgba(129,140,248,0.2)] transition-all">
                <span className="text-indigo-400 font-mono text-sm font-bold leading-none">
                  {'</>'}
                </span>
              </div>
              <span className="text-white text-2xl font-extrabold tracking-tight">
                SnipForge
              </span>
            </Link>
            <p className="text-slate-400 text-sm font-light mt-2 mb-4 leading-relaxed max-w-sm">
              The developer's personal code library. Store, discover, and share reusable functions, hooks, and configurations with a global community.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors cursor-pointer">
                𝕏
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors cursor-pointer font-mono font-bold">
                in
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-colors cursor-pointer font-bold font-serif italic text-lg pb-1">
                f
              </div>
            </div>
          </div>

          <div className="hidden md:block md:col-span-3"></div>

          {/* ── PLATFORM COLUMN ── */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Platform
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium">
                Explore Snippets
              </Link>
              <Link to="/dashboard" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/create" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium">
                Create Snippet
              </Link>
            </div>
          </div>

          {/* ── ACCOUNT COLUMN ── */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Account
            </h4>
            <div className="flex flex-col gap-3">
              <Link to="/login" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium">
                Login
              </Link>
              <Link to="/signup" className="text-slate-400 hover:text-indigo-400 transition-colors duration-200 text-sm font-medium">
                Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-slate-800/60">
          <span className="text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()} SnipForge. Built with the MERN Stack.
          </span>
          <span className="flex items-center gap-2 text-slate-500 text-sm font-medium bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-800/80">
            Created by <span className="text-slate-300 font-bold tracking-wide">Roy Het Jayeshkumar</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
