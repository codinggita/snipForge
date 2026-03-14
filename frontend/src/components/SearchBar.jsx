import { useState, useEffect } from 'react';

const LANGUAGES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
  'HTML/CSS',
  'Shell',
];

const SearchBar = ({
  onSearch,
  initialSearch = '',
  initialLang = '',
  placeholder = 'Search snippets...',
  resultsCount,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [language, setLanguage] = useState(initialLang);

  // ── Debounce: fires onSearch 500ms after user stops typing ──
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm, language);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ── Language dropdown: fires immediately, no debounce ──
  const handleLanguageChange = (e) => {
    const selected = e.target.value;
    setLanguage(selected);
    onSearch(searchTerm, selected);
  };

  // ── Enter key: fires immediately without waiting for debounce ──
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm, language);
    }
  };

  // ── Clear search input only ──
  const handleClear = () => {
    setSearchTerm('');
    onSearch('', language);
  };

  // ── Clear both search and language ──
  const handleClearAll = () => {
    setSearchTerm('');
    setLanguage('');
    onSearch('', '');
  };

  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4">

      {/* ── SEARCH ROW ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

        {/* Search Input wrapper */}
        <div className="relative flex-1">

          {/* Search icon */}
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-base leading-none">
            🔍
          </span>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full h-11 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 pl-10 pr-9 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200"
          />

          {/* Clear (✕) button — visible only when input has a value */}
          {searchTerm && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200 text-sm leading-none"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Language Dropdown */}
        <select
          value={language}
          onChange={handleLanguageChange}
          className="h-11 min-w-[160px] bg-gray-900 border border-gray-600 rounded-lg text-white text-sm px-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer"
        >
          <option value="">All Languages</option>
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* ── BOTTOM ROW: Results count + Clear all ── */}
      {(resultsCount !== undefined && resultsCount !== null) || (searchTerm && language) ? (
        <div className="flex items-center justify-between mt-3">

          {/* Results count */}
          {resultsCount !== undefined && resultsCount !== null ? (
            <span className="text-sm text-gray-400">
              <span className="text-white font-medium">{resultsCount}</span>{' '}
              {resultsCount === 1 ? 'snippet' : 'snippets'} found
            </span>
          ) : (
            <span />
          )}

          {/* Clear all — only when both filters are active */}
          {searchTerm && language && (
            <button
              onClick={handleClearAll}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              Clear all
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
