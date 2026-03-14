import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const languageColors = {
  JavaScript: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
  TypeScript:  'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  Python:      'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  'C++':       'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  Java:        'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  Go:          'bg-teal-500/20 text-teal-300 border border-teal-500/30',
  Rust:        'bg-red-500/20 text-red-300 border border-red-500/30',
};

const SnippetCard = ({ snippet, onBookmark, onDelete, isOwner, isBookmarked }) => {
  const badgeClass =
    languageColors[snippet.language] ||
    'bg-gray-500/20 text-gray-300 border border-gray-500/30';

  const MAX_TAGS = 4;
  const displayTags = snippet.tags.slice(0, MAX_TAGS);
  const extraCount = snippet.tags.length - MAX_TAGS;

  const formattedDate = new Date(snippet.createdAt).toLocaleDateString();

  const firstLetter = snippet.author?.name?.charAt(0).toUpperCase() || '?';

  const codePreview = snippet.code.split('\n').slice(0, 5).join('\n');

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this snippet?'
    );
    if (confirmed) {
      onDelete(snippet._id);
    }
  };

  return (
    <div className="w-full bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-4 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-200">

      {/* ── TOP ROW: Title + Language Badge ── */}
      <div className="flex items-start justify-between gap-3">
        <Link
          to={`/snippet/${snippet._id}`}
          className="text-white font-semibold text-base leading-snug hover:text-indigo-400 transition-colors duration-200 line-clamp-2"
        >
          {snippet.title}
        </Link>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}`}
        >
          {snippet.language}
        </span>
      </div>

      {/* ── DESCRIPTION ── */}
      <p className="text-gray-400 text-sm leading-relaxed overflow-hidden line-clamp-2">
        {snippet.description}
      </p>

      {/* ── CODE PREVIEW BLOCK ── */}
      <div className="relative rounded-lg overflow-hidden">
        <pre className="bg-gray-950 text-gray-300 text-xs font-mono p-3 max-h-28 overflow-hidden leading-relaxed whitespace-pre-wrap break-all">
          <code>{codePreview}</code>
        </pre>
        {/* Fade-out gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
      </div>

      {/* ── TAGS ── */}
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-700 text-gray-300 px-2.5 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
        {extraCount > 0 && (
          <span className="text-xs bg-gray-700 text-gray-400 px-2.5 py-0.5 rounded-full">
            +{extraCount} more
          </span>
        )}
      </div>

      {/* ── BOTTOM ROW: Author + Actions ── */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-700/60">

        {/* Author Info */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {firstLetter}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-gray-300 text-xs font-medium">
              {snippet.author?.name}
            </span>
            <span className="text-gray-500 text-xs">{formattedDate}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Bookmark */}
          <button
            onClick={() => onBookmark(snippet._id)}
            className={`flex items-center gap-1 text-sm transition-colors duration-200 ${
              isBookmarked
                ? 'text-yellow-400 hover:text-yellow-300'
                : 'text-gray-500 hover:text-gray-300'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark snippet'}
          >
            <span className="text-base leading-none">
              {isBookmarked ? '★' : '☆'}
            </span>
            <span className="text-xs font-medium">
              {snippet.bookmarks.length}
            </span>
          </button>

          {/* Delete (owner only) */}
          {isOwner && (
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-500 text-sm transition-colors duration-200"
              title="Delete snippet"
            >
              ✕
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default SnippetCard;
